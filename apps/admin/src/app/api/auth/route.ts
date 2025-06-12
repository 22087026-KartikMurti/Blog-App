import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { env } from "@repo/env/admin";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        
        // Check if the username is correct
        if(username !== env.ADMIN) {
            return NextResponse.json(
                { message: "Invalid username" },
                { status: 401 }
            );
        }
        // Check if the password is correct
        if (password !== env.PASSWORD) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: 1, // Mock user ID
                role: "admin" 
            },
            env.JWT_SECRET, 
            { 
                expiresIn: "1hr" 
            }
        );
        
        // Set the token in cookies
        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            maxAge: 60 * 60, // 1 hour
            path: "/",
            sameSite: "strict"
        });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "An error occurred during login" },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        const cookiesStore = await cookies();
        cookiesStore.delete("auth_token");
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { message: "An error occurred during logout" },
            { status: 500 }
        );
    }
}