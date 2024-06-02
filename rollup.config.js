import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";

const pkgJSON = require("./package.json");

export default [
  {
    input: "./index.js",
    output: [
      {
        file: pkgJSON.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: pkgJSON.module,
        format: "es",
        // exports: "named",
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs({ include: "**/node_modules/**" }),
      postcss(),
      babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
      terser(),
    ],
    external: ["react", "react-dom"],
  }
]