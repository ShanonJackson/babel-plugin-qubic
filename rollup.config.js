import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import url from 'rollup-plugin-url';
import qubic from "./index.js";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];
export default {
    input: "src/index.tsx",
    preserveModules: false,
    output: [
        {
            file: "dist.js",
            format: 'cjs',
            name: 'bundle',
        },
    ],
    external: ["react"],
    plugins: [
        commonjs({
            include: ["node_modules/**"],
        }),
        resolve({ extensions }),
        url(),
        babel({
            extensions,
            presets: ["@babel/preset-react"],
            plugins: [qubic],
            babelrc: false,
            include: ["src/**/*"],
            exclude: "node_modules/**"
        }),
    ],
}
