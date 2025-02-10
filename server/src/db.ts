import mongoose, { model, Schema } from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/brainly-app-ts");
    } catch (error) {
        process.exit(1);
    }
}
connectDb();
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String    
});

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{
        type: mongoose.Types.ObjectId, 
        ref: 'Tag'
    }],
    type: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true   
    },
});

const LinkSchema = new Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
});

const User = model("User", UserSchema);
const Content = model("Content", ContentSchema);
const Link = model("Link", LinkSchema);

export {
    User, 
    Content,
    Link
};
