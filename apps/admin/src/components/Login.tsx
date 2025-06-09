"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export function Login() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoggingIn(true);
        const formData = new FormData(e.currentTarget);
        const password = formData.get("Password") as string;
        
        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({ password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (response.ok) {
                router.push("/");
                router.refresh();
                return;
            } else {
                const data = await response.json();
                setError(data.message);
            }
            setLoggingIn(false);
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred during login");
        }
    };
    
    return (
        <>
            <h1 className="space-y-4">Sign in to your account</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-2">
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        placeholder="input password"
                        className="border p-1"
                    ></input>
                </div>
                {error && (
                    <div className="text-red-500 mb-2">
                        {error}
                    </div>
                )}
                <Button
                    className={`p-2 rounded ${
                        loggingIn 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-700 text-white'
                        }`}
                    type="submit"
                    disabled={loggingIn}
                >{loggingIn ? "Logging In..." : "Sign In"}</Button>
            </form>
        </>
    );
}