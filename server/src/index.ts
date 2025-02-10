import express from "express"; // npm i -D @types/express
import jwt from "jsonwebtoken";

import { Content, Link, User } from "./db";
import { USER_JWT } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  // zod validation
  const username = req.body.username;
  const password = req.body.password;
  // hash the password
  try {
    await User.create({
      username,
      password,
    });

    res.json({
      message: "User signed up",
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exist.",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      USER_JWT,
      { expiresIn: "5h" }
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credential",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { title, link, type } = req.body;
  await Content.create({
    title,
    link,
    tags: [],
    type,
    userId: req.userId,
  });

  res.json({
    message: "Content added",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await Content.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
});

app.delete("/api/v1/content", async (req, res) => {
    const contentId = req.body.contentId;

    await Content.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    });

    res.json({
        message: "Content Deleted."
    });
});

/*
// This piece of code contains race condition(multiple req come from the same user and execute simultaneously)
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await Link.findOneAndUpdate({
            // @ts-ignore
            userId: req.userId
        });
        if(existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = random(10);
        await Link.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        })

    } else {
        await Link.deleteOne({
            // @ts-ignore
            userId: req.userId
        })
        res.json({
            message: "Removed link."
        })
    }
});
*/

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;

    try {
        if (share) {
            const result = await Link.findOneAndUpdate(
                // @ts-ignore
                { userId: req.userId },
                // @ts-ignore
                { $setOnInsert: { userId: req.userId, hash: random(10) } }, // Only insert if document doesn't exist
                { upsert: true, new: true } // Create if doesn't exist, return new document
            );
            // "Atomic" Operations:- The use of "findOneAndUpdate" with "$setOnInsert" and "findOneAndDelete" is crucial. 
            // These are "atomic" operations, which means they are performed as a "single", "indivisible" unit. 
            // This prevents "race" conditions that could occur if two requests try to create or delete the same link at the same time.
            res.json({ hash: result.hash });
        } else {
            const result = await Link.findOneAndDelete({ 
                // @ts-ignore
                userId: req.userId 
            });
            if (result) { // Check if a document was actually deleted
              res.json({ 
                message: "Removed link." 
              });
            } else {
              res.status(404).json({ 
                message: "No link to remove." 
              }); 
            }

        }
    } catch (error) {
        res.status(500).json({ 
            message: "An error occurred." 
        }); 
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    // find link
    const link = await Link.findOne({
        hash
    });

    if(!link) {
        res.status(411).json({
            message: "Sorry, incorrect input."
        })
        return;
    };

    // find content of that corresponding link
    const content = await Content.findOne({
        userId: link.userId
    });

    console.log(link);

    const user = await User.findOne({
        _id: link.userId
    });

    if(!user) {
        res.status(411).json({
            message: "User not Found, error should ideally not happen."
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    })
});

app.listen(4000);
