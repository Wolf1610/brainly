import { useRef } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const signup = async () => {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            if (!username || !password) {
                alert("Username and Password are required.");
                return;
            }

            await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });
            navigate("/signin"); 
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white p-5 rounded-md border-secondary-1 min-w-48 flex flex-col">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} type="password" placeholder="Password" />
                <div className="flex justify-center pt-3">
                    <Button onClick={signup} loading={false} variant="primary" text="Signup" fullwidth={true} />
                </div>
            </div>
        </div>
    );
};
