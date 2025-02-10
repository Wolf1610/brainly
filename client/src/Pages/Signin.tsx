import { useRef } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const signin = async () => {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            // Validate input
            if (!username || !password) {
                alert("Username and password are required.");
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            });

            // Store JWT token in localStorage
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);

            // Redirect user to dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Signin failed:", error);
            alert("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white p-5 rounded-md border-secondary-1 min-w-48 flex flex-col">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-3">
                    <Button onClick={signin} loading={false} variant="primary" text="Signin" fullwidth={true} />
                </div>
            </div>
        </div>
    );
};
