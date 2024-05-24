const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { SwcMinifyWebpackPlugin } = require("swc-minify-webpack-plugin");
const webpack = require("webpack");
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

// const smp = new SpeedMeasurePlugin();

module.exports =
  // smp.wrap({
  {
    entry: "./src/index.js",
    mode: "production",
    performance: {
      hints: false,
    },
    //   experiments: {
    //     lazyCompilation: true,
    //   },
    devtool: false,
    devServer: {
      static: {
        directory: path.join(__dirname, "build"),
      },
      compress: true, // Enable gzip compression
      port: 3000, // Port to run the server on
      historyApiFallback: true, // For single-page applications
    },
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    optimization: {
      minimize: true,
      minimizer: [new SwcMinifyWebpackPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html", // Path to your template file
        filename: "index.html", // Name of the output file (optional)
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            globOptions: { ignore: ["**/index.html"] },
          },
        ],
      }),
      new webpack.ProvidePlugin({
        React: "react", // React must be lowercase!
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: {
            loader: "esbuild-loader",
            options: {
              loader: "jsx", // Remove this if you're not using JSX
              target: "es2015",
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            "style-loader", // Creates style nodes from JS strings
            "css-loader", // Translates CSS into CommonJS
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    // });
  };
