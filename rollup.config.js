import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

// The card is bundled into a single self-contained file at the repo root.
// HACS (Lovelace/Dashboard) serves this exact file as a dashboard resource
// (filename in hacs.json). The committed bundle is what users receive.
export default {
  input: "src/ha-family-task-card.ts",
  output: {
    file: "family-task-card.js",
    format: "es",
    // Single, self-contained bundle so one file is all HACS needs to serve.
    inlineDynamicImports: true,
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser({ format: { comments: false } }),
  ],
};
