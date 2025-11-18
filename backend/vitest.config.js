import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",       // you’re testing backend APIs
    globals: true,             // lets you use test(), expect(), etc. without imports
    include: ["**/tests/**/*.test.js"], // tells Vitest where your tests live
  },
});
