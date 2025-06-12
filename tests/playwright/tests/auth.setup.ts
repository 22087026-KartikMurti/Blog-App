import { test as setup } from "@playwright/test";
import fs from "fs";

////////////////////////////////////////////////////////
// Authentication for Assignment 3
// Uncomment once you start working on the assignment 3
////////////////////////////////////////////////////////

setup(
  "authenticate assignment 3",
  { tag: "@a3" },
  async ({ playwright }) => {
    const authFile = ".auth/user.json";

    const apiContext = await playwright.request.newContext();

    await apiContext.post("/api/auth", {
      data: JSON.stringify({ username: "admin", password: "123" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await apiContext.storageState({ path: authFile });
  },
);
