import { defineConfig } from "vitest/config";

// Pin the time zone: due-date tests must not depend on the machine they run on,
// and a real UTC offset (with summer time) is what families actually have.
// Set here, before the test workers start, so they inherit it.
process.env.TZ = "Europe/Berlin";

export default defineConfig({
  test: {
    // The component tests opt into happy-dom with a `@vitest-environment`
    // comment of their own; anything pure stays in the fast node environment.
    environment: "node",
    setupFiles: ["./test-setup.ts"],
  },
});
