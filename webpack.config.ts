import path from "path";
import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const webpackConfig = (): Configuration => ({
    entry: "./src/index.tsx",
    ...(process.env.production || !process.env.development
        ? {}
        : { devtool: "eval-source-map" }),
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [new TsconfigPathsPlugin({configFile: "./tsconfig.json"})],
    },
    output: {
        filename: "app.js",
        path: path.join(__dirname, "/build"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
                exclude: [/build/, /node_modules/],
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            "process.env": process.env.production || !process.env.development,
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            minify: true,
            hash: true,
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./src/**/*.{ts,tsx,js,jsx}",
            },
        }),
    ],
});

export default webpackConfig();
