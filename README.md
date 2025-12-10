## Prerequisites

First, make sure that "pnpm" is installed in your computer. If not, use this command to install pnpm:

```
npm install -g pnpm
```

## Installing the project

Once the pnpm is installed, in the root of the project install the packages

```
pnpm i
```

To run end to end tests you need to install headless browsers. Please run the following command in the `tests/playwright-web` directory

```
pnpx playwright install
```

## Environment

In all packages `apps/admin` and `packages/db` find `.env.example` files and copy them to `.env`. Set your environment variables accordingly!

## Running the project

To run the project, run the following command in the root directory of your project:

```
turbo dev
```

This will run:

- Client application at [http://localhost:3001](http://localhost:3001)
- Admin application at [http://localhost:3002](http://localhost:3002)

## Running tests

To run the tests please run, you have two options.

### Running Tests in Console

If you want to run all tests, please run

```
turbo all:test
```

### Running Tests in UIs

The packaged tests framework also have the possibility of visually represent your tests for nicer view of test results. To see the UIs, run this command instead of `turbo test-1`:

```
turbo dev:test-1
```

This will launch the End to End testing framework Playwright's test UI similar to below, please use the Play buttons to run individual tests:

![Playwright UI](https://skillpies.s3.ap-southeast-2.amazonaws.com/courses/full-stack-development/sections/assignment-2-1-blog-client-in-advanced-react/Screenshot%202025-02-05%20at%2014.40.35.png)

It also launches the unit and integration test framework Vitest's UI, similar to below. Here, you can also use the play buttons to execute individual tests!

![Vitest UI](https://skillpies.s3.ap-southeast-2.amazonaws.com/courses/full-stack-development/sections/assignment-2-1-blog-client-in-advanced-react/Screenshot%202025-02-05%20at%2014.46.31.png)

## Project structure

The project is monorepo with the following packages split into three categories:

**Applications**

Contains the following web applications:

- **apps/admin** - Admin Website
- **apps/web** - Client website

**Packages**

Contains the following packages with shared code and configurations:

- **packages/ui** - Library of UI elements shared between admin and client
- **packages/utils** - Library of utility functions shared between other projects
- **packages/db** - Library handling the database connection
- **packages/eslint-config**, **packages/tailwind-config** and **packages/typescript-config** contain configuration files for build pipelines for this project

**Tests**

Contains the following test applications:

- **tests/playwright-admin** - End to End tests for the admin application
- **tests/playwright-web** - End to End tests for the client application
- **tests/storybook** - Configured storybook instance for development and testing of React components in isolation
