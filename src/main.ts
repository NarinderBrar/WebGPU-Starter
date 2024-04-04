import './style.css'

import WebGPUHandler from './WebGPUHandler';

import Triangle from './Triangle';
import Renderer from './Renderer';
import Square from './Square';

(async () => {
  const webGPUHandler = WebGPUHandler.getInstance();
  const webGPUSupported =  await webGPUHandler.initialize();

  if(!webGPUSupported) { console.log("webgpu not supported"); return; }

  const triangle = new Triangle('triangle');
  const square = new Square('square');

  const renderer = new Renderer();
  renderer.addMesh(triangle);
  renderer.addMesh(square);

  renderer.render();
})();