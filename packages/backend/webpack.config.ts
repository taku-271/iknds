import * as path from "path";

import CopyPlugin from "copy-webpack-plugin";
import * as webpack from "webpack";
import nodeExternals from "webpack-node-externals";

const config: (env: { production: boolean }) => webpack.Configuration = (
  env = { production: false }
) => {
  const isProduction = !!env.production;
  const distDir = isProduction
    ? path.resolve(__dirname, "dist")
    : path.resolve(__dirname, "tmp");
  const plugins = [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "package.json"),
          to: path.resolve(distDir, "package.json"),
        },
      ],
    }),
  ];

  return {
    mode: isProduction ? "production" : "development",
    target: ["node", "es2023"],
    externals: [nodeExternals({ modulesDir: "../../node_modules" })],
    entry: {
      app: path.resolve(__dirname, "src/index"),
    },
    output: {
      filename: "[name].js",
      path: distDir,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: [/node_modules/],
          options: {
            configFile: "tsconfig.json",
          },
        },
      ],
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".ts"],
    },
    devtool: isProduction ? false : "cheap-module-source-map",
  };
};

export default config;
