import WebGPUHandler from "./WebGPUHandler";

class Pipeline {
  private gpuRenderPipeline: GPURenderPipeline | undefined;

    constructor(shader:string, vertexBuffers:GPUVertexBufferLayout) {
        const webGPUHandler = WebGPUHandler.getInstance();
        const device = webGPUHandler.getDevice();
        const format = webGPUHandler.getPresentationFormat();

        const shaderModule =  device.createShaderModule({code: shader});

        const pipelineDescriptor:GPURenderPipelineDescriptor = {
          vertex: {
            module: shaderModule,
            entryPoint: "vertex_main",
            buffers: [vertexBuffers],
          },
          fragment: {
            module: shaderModule,
            entryPoint: "fragment_main",
            targets: [
              {
                format: format,
              },
            ],
          },
          primitive: {
            topology: "triangle-list",
          },
          layout: "auto",
        };
        
        this.gpuRenderPipeline = device.createRenderPipeline(pipelineDescriptor);
    }

    getGPURenderPipeline=() => {return this.gpuRenderPipeline;}
}

export default Pipeline;