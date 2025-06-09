import react from "@vitejs/plugin-react";
import path from "path";

import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      // an example of file based convention,
      // you don't have to follow it
      include: ["./src/**/*.{test,spec}.ts"],
      name: "unit",
      environment: "node",
    },
  },
  {
    define: {
      "process.env": {
        NODE_ENV: "test",
        __NEXT_IMAGE_OPTS: {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: [],
          path: '/_next/image',
          loader: 'default',
        },
      },
    },
    resolve: {
      alias: {
        // Adjust the path as needed based on your project structure
        "next/link": path.resolve(__dirname, "src/mocks/link"),
        "next/image": path.resolve(__dirname, "src/mocks/image"),
      },
    },
    plugins: [react()],
    test: {
      // an example of file based convention,
      // you don't have to follow it
      include: ["./src/**/*.{test,spec}.tsx"],
      setupFiles: "./vitest.setup.tsx",
      name: "browser",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
      },
    },
  },
]);
