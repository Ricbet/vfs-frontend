const WebpackBar = require("webpackbar");
const path = require("path");

const ROOT_PATH = path.resolve(__dirname);

module.exports = {
    mode: 'production',
    entry: [path.join(ROOT_PATH, "src/index.ts")],
    output: {
        path: path.join(ROOT_PATH, "lib"),
        filename: "index.js",
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js"]
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new WebpackBar({
            profile: true
        })
    ],
    node: {
        fs: "empty",
        child_process: "empty",
        net: "empty",
        crypto: "empty"
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};
