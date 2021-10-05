import React from "react";

const ort = require('onnxruntime-web');

function App() {

    async function Main() {
      try {
        // create a new session and load the model.
        const session = await ort.InferenceSession.create('../interactive_module.onnx');
    
        // prepare inputs. a tensor need its corresponding TypedArray as data
        //     let n = new npyjs();
        //     const lowResArray = await n.load("low_res_emb.npy");
        //     const lowResTensor = new ort.Tensor('float32', lowResArray.data, lowResArray.shape);
        //     const highResArray = await n.load("high_res_emb.npy");
        //     const highResTensor = new ort.Tensor('float32', highResArray.data, highResArray.shape);
        const lowResArray = new Float32Array(1 * 256 * 25 * 32).fill(0.0);
        const lowResTensor = new ort.Tensor('float32', lowResArray, [1, 256, 25, 32]);
        const highResArray = new Float32Array(1 * 256 * 200 * 256).fill(0.0);
        const highResTensor = new ort.Tensor('float32', highResArray, [1, 256, 200, 256]);
    
        const pointCoords = Float32Array.from([0.5, 0.5]);
        const pointLabels = Float32Array.from([1]);
        const pointCoordsTensor = new ort.Tensor('float32', pointCoords, [1, 1, 2]);
        const pointLabelsTensor = new ort.Tensor('float32', pointLabels, [1, 1]);
        
        // prepare feeds. use model input names as keys.
        const feeds = { low_res_embedding: lowResTensor, high_res_embedding: highResTensor, point_coords: pointCoordsTensor, point_labels: pointLabelsTensor}
    
        // feed inputs and run
        const results = await session.run(feeds);
        const output = results[session.outputNames[0]];
        alert('Shape:' + output.dims + ', Output: ' + output.data)
    
      } catch (e) {
        console.log(`failed to inference ONNX model: ${e}.`);
        console.error(`FFFFFF: ${e.stack}.`);
      }
    }

  return (
    <div>
      <button onClick={Main}>
        Do inference
      </button>
      <h1>Using ONNX ||| </h1>
    </div>
  )
}

export default App