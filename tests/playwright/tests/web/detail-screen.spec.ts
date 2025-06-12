import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("DETAIL SCREEN", () => {
  test.beforeEach(async () => {
    await seed();
  });

  test(
    "Detail view",
    {
      tag: "@a1",
    },
    async ({ page }) => {
      await page.goto("/post/boost-your-conversion-rate");

      // DETAIL SCREEN > Detail page shows the same items as list item, but the short description is replaced by formatted long description

      const item = await page.getByTestId("blog-post-1");
      await expect(item).toBeVisible();

      await expect(item.getByText("Boost your conversion rate")).toBeVisible();
      await expect(
        item.getByText("Boost your conversion rate"),
      ).toHaveAttribute("href", "/post/boost-your-conversion-rate");

      await expect(item.getByText("Node")).toBeVisible();
      await expect(item.getByText("#Back-End")).toBeVisible();
      await expect(item.getByText("#Databases")).toBeVisible();
      await expect(item.getByText("18 Apr 2022")).toBeVisible();
      await expect(item.getByText("321 views")).toBeVisible();
      await expect(item.getByText("3 likes")).toBeVisible();

      // DETAIL SCREEN > Detail text is stored as Markdown, which needs to be converted to HTML
      await expect(
        await page.getByTestId("content-markdown").innerHTML(),
      ).toContain("<strong>sint voluptas</strong>");
    },
  );

  test(
    "Views increase on each view",
    {
      tag: "@a3",
    },
    async ({ page }) => {
      // BACKEND / CLIENT > Each visit of the page increases the post "views" count by one

      await page.goto("/post/boost-your-conversion-rate");
      await expect(page.getByText("321 views")).toBeVisible();
      await page.goto("/post/boost-your-conversion-rate");
      await expect(page.getByText("322 views")).toBeVisible();
    },
  );

  test(
    "Like posts",
    {
      tag: "@a3",
    },
    async ({ page }) => {
      // BACKEND / CLIENT > User can "like" the post on the detail screen, NOT on the list

      await page.goto("/post/boost-your-conversion-rate");
      await expect(page.getByText("3 likes")).toBeVisible();
      await page.getByTestId("like-button").click();
      await expect(page.getByText("4 likes")).toBeVisible();
      await page.goto("/post/boost-your-conversion-rate");
      await expect(page.getByText("4 likes")).toBeVisible();
      await page.waitForTimeout(1000); //add a small timeout to wait for the like button to be visible
      await page.getByTestId("like-button").click();
      await expect(page.getByText("3 likes")).toBeVisible();
    },
  );

  test(
    "Can comment on posts",
    {
      tag: "@comment",
    },
    async ({ page }) => {
      // BACKEND / CLIENT > User can comment on the post on the detail screen, NOT on the list

      await page.goto("/post/fifth-post");

      // COMMENT > User can add a comment to the post
      await page.getByPlaceholder("Add a comment...").fill("This is a test comment");
      await page.getByRole("button", { name: "Post Comment" }).click();
      await page.waitForTimeout(1000); // wait for the comment to be posted
      await expect(page.getByText("This is a test comment")).toBeVisible();
    },
  );

  test(
    "Can reply to comments",
    {
      tag: "@comment",
    },
    async ({ page }) => {
      // BACKEND / CLIENT > User can reply to comments on the post detail screen

      await page.goto("/post/fifth-post");

      // COMMENT > User can reply to a comment
      await page.getByPlaceholder("Add a comment...").fill("This is a test comment");
      await page.getByRole("button", { name: "Post Comment" }).click();
      await page.waitForTimeout(1000); // wait for the comment to be posted
      await expect(page.getByText("This is a test comment")).toBeVisible();

      // Reply to the comment
      await page.getByPlaceholder("Write a reply...").fill("This is a reply");
      await page.getByRole("button", { name: "Post Reply" }).click();
      await page.waitForTimeout(1000); // wait for the reply to be posted
      await expect(page.getByText("This is a reply")).toBeVisible();
    },
  );

  test(
    "Posted comments and replies are sanitised",
    {
      tag: "@comment",
    },
    async ({ page }) => {
      // BACKEND / CLIENT > User can post comments and replies, which are sanitised to prevent XSS attacks

      let scriptExecuted = false;
      page.on('dialog', async dialog => {
        scriptExecuted = true;
        await dialog.dismiss(); // Dismiss the alert to prevent it from blocking the test
      })

      await page.goto("/post/fifth-post");

      // COMMENT > User can not add a comment with HTML tags
      await page.getByPlaceholder("Add a comment...").fill("<script>alert('XSS')</script>");
      await page.getByRole("button", { name: "Post Comment" }).click();
      await page.waitForTimeout(1000); // wait for the comment to be posted

      // Check that the comment does not contain the script tag
      expect(scriptExecuted).toBe(false);
      const errorMessage = await page.getByText("Comment contains invalid content");
      await expect(errorMessage).toBeVisible();
      await expect(page.getByText("<script>alert('XSS')</script>")).not.toBeVisible();

      await page.getByPlaceholder("Add a comment...").fill("This is a valid comment");
      await page.getByRole("button", { name: "Post Comment" }).click();
      await page.waitForTimeout(1000); // wait for the comment to be posted
      await expect(page.getByText("This is a valid comment")).toBeVisible();

      // REPLY > User can not add a reply with HTML tags
      await page.getByPlaceholder("Write a reply...").fill("<script>alert('XSS')</script>");
      await page.getByRole("button", { name: "Post Reply" }).click();
      await page.waitForTimeout(1000); // wait for the reply to be posted

      // Check that the reply does not contain the script tag
      expect(scriptExecuted).toBe(false);
      const replyErrorMessage = await page.getByText("Reply contains invalid content");
      await expect(replyErrorMessage).toBeVisible();
      await expect(page.getByText("<script>alert('XSS')</script>")).not.toBeVisible();

      await page.getByPlaceholder("Write a reply...").fill("This is a valid reply");
      await page.getByRole("button", { name: "Post Reply" }).click();
      await page.waitForTimeout(1000); // wait for the reply to be posted
      await expect(page.getByText("This is a valid reply")).toBeVisible();
    },
  )
});
