const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = () => {
    return {
        target: ['web'],
        entry: path.resolve(__dirname, '/src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.min.js',
            library: {
                type: 'umd'
            }
        },
        devtool: 'inline-source-map',
        devServer: {
          static : {
            directory : path.join(__dirname, "./dist")
          },
          port: 9000,
          devMiddleware: {
              publicPath: "/",
          },
          hot: true,
          historyApiFallback: true,
        },
        plugins: [
          new CopyPlugin({
            // Use copy plugin to copy *.wasm to output folder.
            patterns: [{ from: 'node_modules/onnxruntime-web/dist/*.wasm', to: '[name][ext]' }]
          }),
          // build an minifide insde dist
          new HtmlWebPackPlugin({
            template: "./src/index.html",
          }),
        ],
        module: {
            rules: [
              {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: { presets: ["@babel/preset-env", "@babel/preset-react"], },
              },
              {
                test: /\.css$/,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.(svg|png|jpe?g|ttf)$/,
                loader: "url-loader",
              },
              {
                test: /\.jpg$/,
                loader: "file-loader",
              },
            ],
          },
        //mode: 'production'
    }
};