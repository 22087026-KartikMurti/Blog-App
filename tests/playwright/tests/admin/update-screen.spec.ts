import { seed } from "../../../../packages/db/src/seed";
import { expect, test } from "./fixtures";

test.beforeEach(async () => {
  await seed();
});

test.describe("ADMIN UPDATE SCREEN", () => {
  test(
    "Authorisation",
    {
      tag: "@a2",
    },
    async ({ page }) => {
      await page.goto("/posts/no-front-end-framework-is-the-best");

      // UPDATE SCREEN > Shows login screen if not logged
      await expect(
        page.getByText("Sign in to your account", { exact: true }),
      ).toBeVisible();
    },
  );

  test(
    "Update post form",
    {
      tag: "@a2",
    },
    async ({ userPage }) => {
      await userPage.goto("/posts/no-front-end-framework-is-the-best");

      const saveButton = await userPage.getByText("Save");

      // UPDATE SCREEN > There must be the following fields which must be validated for errors:

      // UPDATE SCREEN > Title

      await userPage.getByLabel("Title").clear();
      await saveButton.click();

      await expect(userPage.getByText("Title is required")).toBeVisible();
      await userPage.getByLabel("Title").fill("New title");
      await saveButton.click();
      await expect(userPage.getByText("Title is required")).not.toBeVisible();

      // UPDATE SCREEN > Category

      await userPage.getByLabel("Category").clear();
      await saveButton.click();
      await expect(userPage.getByText("Category is required")).toBeVisible();

      await userPage.getByLabel("Category").fill("React");
      await saveButton.click();
      await expect(userPage.getByText("Category is required")).not.toBeVisible();

      // UPDATE SCREEN > Description

      await userPage.getByLabel("Description").clear();
      await saveButton.click();

      await expect(userPage.getByText("Description is required")).toBeVisible();
      await userPage.getByLabel("Description").fill("New Description");
      await saveButton.click();
      await expect(
        userPage.getByText("Description is required"),
      ).not.toBeVisible();

      // cannot be longer than 200
      await userPage.getByLabel("Description").fill("a".repeat(201));
      await saveButton.click();
      await expect(
        userPage.getByText(
          "Description is too long. Maximum is 200 characters",
        ),
      ).toBeVisible();

      await userPage.getByLabel("Description").fill("a".repeat(200));
      await saveButton.click();
      await expect(
        userPage.getByText(
          "Description is too long. Maximum is 200 characters",
        ),
      ).not.toBeVisible();

      // UPDATE SCREEN > Content

      await userPage.waitForTimeout(1000); // wait for the editor to load
      await userPage.locator('.ql-editor').click();
      await userPage.keyboard.press('Control+A');
      await userPage.keyboard.press("Backspace");
      await saveButton.click();

      await expect(userPage.getByText("Content is required")).toBeVisible();
      await userPage.locator('.ql-editor').click();
      await userPage.keyboard.type("New Content");
      await saveButton.click();
      await expect(userPage.getByText("Content is required")).not.toBeVisible();

      // UPDATE SCREEN > Image

      await userPage.getByLabel("Image URL").clear();
      await saveButton.click();

      // required
      await expect(userPage.getByText("Image URL is required")).toBeVisible();

      // invalid
      await userPage.getByLabel("Image URL").fill("some url");
      await saveButton.click();
      await expect(userPage.getByText("This is not a valid URL")).toBeVisible();

      await userPage
        .getByLabel("Image URL")
        .fill("http://example.com/image.jpg");
      await saveButton.click();
      await expect(
        userPage.getByText("Image URL is required"),
      ).not.toBeVisible();

      // UPDATE SCREEN > Tag Lists

      await userPage.getByLabel("Tags").clear();
      await saveButton.click();

      await expect(
        userPage.getByText("At least one tag is required"),
      ).toBeVisible();
      await userPage.getByLabel("Tags").fill("Tag");
      await saveButton.click();
      await expect(
        userPage.getByText("At least one tag is required"),
      ).not.toBeVisible();
    },
  );

  test(
    "Save post form",
    {
      tag: "@a3",
    },
    async ({ userPage }) => {
      await seed();
      await userPage.goto("/posts/no-front-end-framework-is-the-best");

      // BACKEND / ADMIN / UPDATE SCREEN > Logged in user can save changes to database, if the form is validated

      await userPage.getByLabel("Title").fill("New title");
      await userPage.getByLabel("Description").fill("New Description");
      await userPage.getByLabel("Category").fill("React"); 
      await userPage.waitForTimeout(1000); // wait for the editor to load
      await userPage.locator('.ql-editor').click();
      await userPage.keyboard.press('Control+A');
      await userPage.keyboard.type("New Content");
      await userPage
        .getByLabel("Image URL")
        .fill("http://example.com/image.jpg");
      await userPage.getByLabel("Tags").fill("Tag");
      await userPage.getByText("Save").click();

      await expect(
        userPage.getByText("Post updated successfully"),
      ).toBeVisible();

      // check if the changes are there
      await userPage.goto("/");

      const article = await userPage.locator("article").first();
      await expect(article.getByText("New title")).toBeVisible();
      await expect(article.getByText("Tag")).toBeVisible();
      await expect(article.locator("img")).toHaveAttribute(
        "src",
        /url=http%3A%2F%2Fexample\.com%2Fimage\.jpg/, //Next.js encodes the URL
      );
    },
  );

  test(
    "Create post form",
    {
      tag: "@a3",
    },
    async ({ userPage }) => {
      await seed();
      await userPage.goto("/posts/create");

      // BACKEND / ADMIN / UPDATE SCREEN > Logged in user can create a new post to the database, if the form is validated

      await userPage.getByLabel("Title").fill("New title");
      await userPage.getByLabel("Category").fill("React"); 
      await userPage.getByLabel("Description").fill("New Description");
      await userPage.waitForTimeout(1000); // wait for the editor to load
      await userPage.locator('.ql-editor').click();
      await userPage.keyboard.press('Control+A');
      await userPage.keyboard.type("New Content");
      await userPage
        .getByLabel("Image URL")
        .fill("http://example.com/image.jpg");
      await userPage.getByLabel("Tags").fill("Tag");
      await userPage.getByText("Save").click();

      await expect(
        userPage.getByText("Post updated successfully"),
      ).toBeVisible();

      // check if the changes are there
      await userPage.goto("/");

      const article = await userPage.locator("article").first();
      await expect(article.getByText("New title")).toBeVisible();
      await expect(article.locator('a:has-text("New title")')).toHaveAttribute(
        "href",
        "/posts/new-title",
      );
      await expect(article.getByText("Tag")).toBeVisible();
      await expect(article.locator("img")).toHaveAttribute(
        "src",
        /url=http%3A%2F%2Fexample\.com%2Fimage\.jpg/, //Next.js encodes the URL
      );
    },
  );

  test(
    "Image Preview",
    {
      tag: "@a2",
    },
    async ({ userPage }) => {
      await userPage.goto("/posts/no-front-end-framework-is-the-best");

      // UPDATE SCREEN > Under the image input is an image preview;

      await expect(userPage.getByTestId("image-preview")).toBeVisible();
      await expect(
        await userPage.getByTestId("image-preview").getAttribute("src"),
      ).toBe(
        "https://plus.unsplash.com/premium_photo-1661517706036-a48d5fc8f2f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      );
    },
  );

  test(
    "Save Button",
    {
      tag: "@a2",
    },
    async ({ userPage }) => {
      await userPage.goto("/posts/no-front-end-framework-is-the-best");

      // UPDATE SCREEN > User can click on the "Save" button that displays an error ui if one of the fields is not specified or valid.

      await expect(
        userPage.getByText("Please fix the errors before saving"),
      ).not.toBeVisible();

      await userPage.getByLabel("Title").clear();
      await userPage.getByText("Save").click();
      await expect(
        userPage.getByText("Please fix the errors before saving"),
      ).toBeVisible();
    },
  );

  test(
    "Rich Text Editor works",
    {
      tag: "@RT-Editor",
    },
    async ({ userPage }) => {
      await userPage.goto("/posts/no-front-end-framework-is-the-best");

      // UPDATE SCREEN > Rich Text Editor works

      await userPage.waitForTimeout(1000); // wait for the editor to load
      const editor = userPage.locator('.ql-editor');
      await editor.click();
      await userPage.keyboard.press('Control+A');
      await userPage.keyboard.press("Backspace");
      await userPage.keyboard.type("This is a test content");
      await expect(editor).toHaveText("This is a test content");

      // Check if formatting works
      await userPage.keyboard.press('Control+A');
      await userPage.locator('.ql-bold').click();
      const boldText = await editor.evaluate(
        (el) => {
          return el.innerHTML.includes('<b>') ||
                el.innerHTML.includes('<strong>');
        }
      );
      expect(boldText).toBe(true);
      await expect(editor).toHaveText("This is a test content");

      await userPage.getByLabel("Description").clear();
      await userPage.getByLabel("Description").fill("New Description");

      await userPage.getByRole("button", { name: "Save" }).click();
      await expect(
        userPage.getByText("Post updated successfully"),
      ).toBeVisible();
    },
  );

  test(
    "Sanitisation of RT-Editor works",
    {
      tag: "@RT-Editor",
    },
    async ({ userPage }) => {
      await userPage.goto("/posts/no-front-end-framework-is-the-best");

      // UPDATE SCREEN > Sanitisation of Rich Text Editor works

      await userPage.waitForTimeout(1000); // wait for the editor to load
      const editor = userPage.locator('.ql-editor');
      await editor.click();
      await userPage.keyboard.press('Control+A');
      await userPage.keyboard.press("Backspace");
      await userPage.keyboard.press("Enter");
      await userPage.keyboard.press('Control+A');
      await userPage.keyboard.press("Backspace");
      await userPage.keyboard.type("<script>alert('XSS');</script>");
      await expect(editor).toHaveText("<script>alert('XSS');</script>");

      await userPage.getByLabel("Description").clear();
      await userPage.getByLabel("Description").fill("New Description");

      // Check if sanitisation works
      await userPage.getByRole("button", { name: "Save" }).click();
      await userPage.waitForTimeout(1000);
      await expect(
        userPage.getByText("Please fix the errors before saving"),
      ).toBeVisible();
      await expect(userPage.getByText("Content contains invalid HTML")).toBeVisible();
      
      await userPage.locator('.ql-editor').click();
      await userPage.keyboard.press('Control+A');
      await userPage.keyboard.press("Backspace");
      await userPage.keyboard.type("Write something..."); // Just text without script tags
      await expect(editor).toHaveText("Write something...");
      await userPage.keyboard.press('Enter');
      await userPage.keyboard.type("<script>alert('XSS');</script>"); // The script tags here

      await userPage.getByRole("button", { name: "Save" }).click();
      await expect(
        userPage.getByText("Post updated successfully"),
      ).toBeVisible();
      await expect(userPage.getByText("Content contains invalid HTML")).not.toBeVisible();

      // Check if the script tag is removed
      await userPage.goto("/posts/no-front-end-framework-is-the-best");
      const postContent = await userPage.locator('.ql-editor').textContent();
      expect(postContent).toContain("Write something...");
      expect(postContent).not.toContain("<script>alert('XSS');</script>");
    },
  )
});
