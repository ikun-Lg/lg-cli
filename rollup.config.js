import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default defineConfig([
  {
    input: {
      index: "src/index.ts", //入口文件
    },
    output: [
      {
        dir: "dist", // 输出目录
        format: "cjs", //输出commonjs
      },
    ],
    plugins:[
        nodeResolve(),
        externals({
            devDeps:false, //识别package.json中的dev依赖  当做外部依赖
        }),
        typescript(),
        json(),
        commonjs(),
        terser()
    ]
  },
]);
