class WebGPUHandler {
  private static instance: WebGPUHandler | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private device: GPUDevice | null = null;
  private context: GPUCanvasContext | null = null;
  private presentationFormat: GPUTextureFormat | null = null;

  private constructor() {}

  static getInstance(): WebGPUHandler {
    if (!WebGPUHandler.instance) {
      WebGPUHandler.instance = new WebGPUHandler();
    }
    return WebGPUHandler.instance;
  }

  async initialize() {
    if (this.device && this.context) {
      return true;
    }

    const adapter = await navigator.gpu?.requestAdapter();
    this.device = await adapter?.requestDevice();
    if (!this.device) {
      console.error("need a browser that supports WebGPU");
      return false;
    }

    this.canvas = document.querySelector<HTMLCanvasElement>("#webgpu-canvas");
    this.context = this.canvas.getContext("webgpu");

    this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({
      device: this.device,
      format: this.presentationFormat,
      alphaMode: "premultiplied",
    });
    return true;
  }

  getCanvas = () => {
    return this.canvas;
  };

  getDevice = () => {
    return this.device;
  };

  getContext = () => {
    return this.context;
  };

  getPresentationFormat = () => {
    return this.presentationFormat;
  };

  private setupCanvasResizeObserver(canvas: HTMLCanvasElement) {
    const observer = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    });
    observer.observe(canvas);
  }
}

export default WebGPUHandler;
