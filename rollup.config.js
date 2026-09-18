import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

// The card is bundled straight into the integration, which serves this exact
// file at /family_task_card/family-task-card.js (see const.py / __init__.py).
export default {
  input: "src/ha-family-task-card.ts",
  output: {
    file: "custom_components/family_task_card/family-task-card.js",
    format: "es",
    // Single, self-contained bundle so the integration serves one file.
    inlineDynamicImports: true,
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser({ format: { comments: false } }),
  ],
};
