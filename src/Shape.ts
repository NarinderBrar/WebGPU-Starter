import BufferManager from "./BufferManager";

class Shape {
  protected id: string;
  protected index: number;
  protected indexCount: number = 0;

  protected uniformValues: Float32Array;
  protected bufferManager: BufferManager;

  constructor(name:string) {
    this.id = name + new Date().getTime();
    this.bufferManager = BufferManager.getInstance();
  }

  protected setupUniformBuffers(color:number[], offset:number[]): void {
    const uniformBufferSize = 8 * 4; // offset is 2 32bit floats (4bytes each)

    this.uniformValues = new Float32Array(uniformBufferSize / 4);
    this.uniformValues.set(color, 0); 
    this.uniformValues.set(offset, 4);

    this.bufferManager.createUniformBuffer(
      this.id,
      uniformBufferSize,
      this.uniformValues
    );

    this.bufferManager.updateUniformBuffer(this.id, this.uniformValues);
  }

  getUniformValues = (): Float32Array => {
    return this.uniformValues;
  };

  setUniformValues = (value: Float32Array): void => {
    this.uniformValues = value;
  };

  getId = (): string => {
    return this.id;
  };

  getIndex = (): number =>  { return this.index; };

  getIndexCount():number { return this.indexCount;};
}

export default Shape;
