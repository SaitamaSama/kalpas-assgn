import { config as dotenv } from "dotenv";
import * as DotenvPlugin from "dotenv-webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

dotenv();

const config: webpack.Configuration = {
  entry: [path.join(path.resolve(__dirname, "src"), "index.tsx")],
  output: {
    filename: "app.bundle.js",
    chunkFilename: "chunk-[name].bundle.js",
    path: path.resolve(
      __dirname,
      process.env.NODE_ENV === "production" ? "docs" : "dist",
    ),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(path.resolve(__dirname, "src"), "index.html"),
    }),
    // @ts-ignore
    new DotenvPlugin(),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "babel-loader" },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpeg|jpg|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devServer: {
    historyApiFallback: true,
  },
  mode: process.env["NODE_ENV"] as "development" | "production",
};

export default config;
