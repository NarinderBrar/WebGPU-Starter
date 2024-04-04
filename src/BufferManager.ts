import WebGPUHandler from "./WebGPUHandler";

class BufferManager {
    private static instance: BufferManager | null = null;
    private device: GPUDevice;
    
    private vertexBuffers: Map<string, GPUBuffer>;
    private indexBuffers: Map<string, GPUBuffer>;
    private uniformBuffers: Map<string, GPUBuffer>;
    private uniformValues: Map<string, Float32Array>;
    private vertexBufferLayout:GPUVertexBufferLayout;
  
    private constructor() {
        this.device = WebGPUHandler.getInstance().getDevice();

        this.vertexBuffers = new Map<string, GPUBuffer>();
        this.indexBuffers = new Map<string, GPUBuffer>();
        this.uniformBuffers = new Map<string, GPUBuffer>();
        this.uniformValues = new Map<string, Float32Array>();
        this.vertexBufferLayout = {
          attributes: [
            {// position attribute
              shaderLocation: 0, 
              offset: 0,
              format: "float32x3",
            }
          ],
          arrayStride: 12, // total bytes per vertex
          stepMode: "vertex",
        };
      }
    
      static getInstance(): BufferManager {
        if (!BufferManager.instance) {
          BufferManager.instance = new BufferManager();
        }
        return BufferManager.instance;
      }

    createVertexBuffer(name: string, vertices: Float32Array): void {
      const buffer = this.device.createBuffer({
        size: vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      });
      this.device.queue.writeBuffer(
        buffer,
        0,
        vertices,
        0,
        vertices.length
      );
      this.vertexBuffers.set(name, buffer);
    }
  
    createUniformBuffer(name: string, size: number, values: Float32Array): void {
      const buffer = this.device.createBuffer({
        size: size,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      });
      this.device.queue.writeBuffer(
        buffer,
        0,
        values.buffer
      );
      this.uniformBuffers.set(name, buffer);
      this.uniformValues.set(name, values);
    }
  
    createIndexBuffer(name: string, indices: Uint32Array): void {
      const device = WebGPUHandler.getInstance().getDevice();
      const buffer = device.createBuffer({
        size: indices.byteLength,
        usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
      });
      device.queue.writeBuffer(buffer, 0, indices);
      this.indexBuffers.set(name, buffer);
    }
  
    getVertexBuffer(name: string): GPUBuffer | undefined {
      return this.vertexBuffers.get(name);
    }
  
    getUniformBuffer(name: string): GPUBuffer | undefined {
      return this.uniformBuffers.get(name);
    }
  
    getUniformValues(name: string): Float32Array | undefined {
      return this.uniformValues.get(name);
    }
  
    getVertexBufferLayout():GPUVertexBufferLayout
    {
        return this.vertexBufferLayout;
    }

    updateUniformBuffer(name: string, values: Float32Array): void {
      const buffer = this.uniformBuffers.get(name);
      if (buffer) {
        this.device.queue.writeBuffer(
          buffer,
          0,
          values.buffer,
          values.byteOffset,
          values.byteLength
        );
        this.uniformValues.set(name, values);
      }
    }

    getIndexBuffer(name: string): GPUBuffer | undefined {
      return this.indexBuffers.get(name);
    }
  }
  
  export default BufferManager;