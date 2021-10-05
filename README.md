# ONNX Runtime Web - Webpack - React

This repo is a quick demonstration to run [ONNX Runtime Web](https://onnx.ai/) in the browser using a bundler. Since ONNX uses [WebAssembly](https://webassembly.org/), it is neccesary to set up a custom webpack configuration.

## Usage

```
git clone git@github.com:sahirgomez1/react-onnxruntime.git
```
Install all dependencies from the project root folder.

```
npm install
```
To compile the bundle run.
```
npm run build
```
This creates a `dist` folder with a `bundle.min.js` file, which containes all dependencies bundled and minified by webpack.

Make sure there is a script tag as the following `<script src="./dist/bundle.min.js"></script>` inside the `index.html` file.

Finally, to start the devServer run. 
```
npm start
```