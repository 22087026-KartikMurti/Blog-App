"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";

export function LogoutButton() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const response = await fetch("/api/auth", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
      });
      
      if (response.ok) {
          window.location.href = '/';
          return;
      } else {
          console.error("Logout failed");
          setLoggingOut(false);
      }
    } catch (error) {
        console.error("Login error:", error);
        setLoggingOut(false);
    }
  }

  return (
      <form onSubmit={handleLogout}>
        <Button
          className={`p-2 rounded ${
            loggingOut 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-700 hover:bg-blue-500 text-white'}`}
          type="submit"
          disabled={loggingOut}
        >{loggingOut ? 'Logging Out...' : 'Logout'}</Button>
      </form>
  )
}