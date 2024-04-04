import Shape from "./Shape";

class Square extends Shape {
  constructor(name:string) {
    super(name);
    this.setupVerticesBuffers(1.0, 1.0);
    this.setupUniformBuffers([1.0, 0, 0, 1.0],[0.5, 1, 0, 0]);
  }

  private setupVerticesBuffers(width: number, height: number): void {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const vertices = new Float32Array([
      -halfWidth, halfHeight, 0,   // top-left
      halfWidth, halfHeight, 0,    // top-right
      -halfWidth, -halfHeight, 0,  // bottom-left
      halfWidth, -halfHeight, 0    // bottom-right
    ]);

    const indices = new Uint32Array([
      0, 1, 3,  // First triangle
      0, 2, 3   // Second triangle
    ]);

    this.indexCount = indices.length;

    this.bufferManager.createVertexBuffer(this.id, vertices);
    this.bufferManager.createIndexBuffer(this.id, indices);
  }
}

export default Square;
