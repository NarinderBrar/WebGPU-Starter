import Shape from "./Shape";

class Triangle extends Shape {
  constructor(name:string) {
    super(name);
    this.setupVerticesBuffers();
    this.setupUniformBuffers([0.0, 0.5, 0, 1],[-1.5, 0, 0, 1]);
  }

  private setupVerticesBuffers(): void {
    const vertices = new Float32Array([
      0.0, 0.5, 0,  // top vertex pos
     -0.5, -0.5, 0,  // bottom-left vertex pos
      0.5, -0.5, 0,  // bottom-right vertex pos
    ]);

    const indices = new Uint32Array([ 0, 1, 2 ]);
    this.indexCount = indices.length;
    
    this.bufferManager.createVertexBuffer(this.id, vertices);
    this.bufferManager.createIndexBuffer(this.id, indices);
  }
}

export default Triangle;
