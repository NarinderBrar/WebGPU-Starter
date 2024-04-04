import BufferManager from "./BufferManager";
import Pipeline from "./Pipeline";
import Shape from "./Shape";
import WebGPUHandler from "./WebGPUHandler";
import shader from "./shaders/shader.wgsl";

class Renderer {
  private webGPUHandler: WebGPUHandler;
  private device: GPUDevice;
  private bufferManager: BufferManager;

  private gpuRenderPipeline: GPURenderPipeline;

  private uniformBindGroups: Map<string, GPUBindGroup>;
  private ids: string[] = [];
  private indexCounts: Map<string, number>;

  constructor() {
    this.webGPUHandler = WebGPUHandler.getInstance();
    this.device = this.webGPUHandler.getDevice();
    this.bufferManager = BufferManager.getInstance();
    this.uniformBindGroups = new Map<string, GPUBindGroup>();
    this.indexCounts = new Map<string, number>();

    const vertexBufferLayout = this.bufferManager.getVertexBufferLayout();

    const pipeline = new Pipeline(shader, vertexBufferLayout);
    this.gpuRenderPipeline = pipeline.getGPURenderPipeline();

    //requestAnimationFrame(this.render);
  }

  addMesh(mesh: Shape) {
    const id = mesh.getId();

    const uniformBindGroupDescriptor: GPUBindGroupDescriptor = {
      label: `BindGroup ${id}`,
      layout: this.gpuRenderPipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: { buffer: this.bufferManager.getUniformBuffer(id) },
        },
      ],
    };

    const uniformBindGroup = this.device.createBindGroup(uniformBindGroupDescriptor);
    this.uniformBindGroups.set(id, uniformBindGroup);
    this.ids.push(id);
    this.indexCounts.set(id, mesh.getIndexCount());
  }

  render = () => {
    const device = this.webGPUHandler.getDevice();
    const context = this.webGPUHandler.getContext();

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(this.gpuRenderPipeline);

    this.ids.forEach(id => {
    passEncoder.setVertexBuffer(0, this.bufferManager.getVertexBuffer(id));
    passEncoder.setIndexBuffer(this.bufferManager.getIndexBuffer(id), "uint32");
    passEncoder.setBindGroup(0, this.uniformBindGroups.get(id));
    passEncoder.drawIndexed(this.indexCounts.get(id), 1, 0, 0);
    });

    passEncoder.end();

    const commandBuffer = commandEncoder.finish();
    this.device.queue.submit([commandBuffer]);

  //  requestAnimationFrame(this.render);
  };
}

export default Renderer;
