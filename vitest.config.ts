import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // The component tests opt into happy-dom with a `@vitest-environment`
    // comment of their own; anything pure stays in the fast node environment.
    environment: "node",
    setupFiles: ["./test-setup.ts"],
  },
});
