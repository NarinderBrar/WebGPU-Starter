struct VertexOutput {
  @builtin(position) position : vec4f,
}

struct Uniform {
  color: vec4f,
  offset: vec4f,
};

@group(0) @binding(0) var<storage, read> uniform: Uniform;

@vertex
fn vertex_main(@location(0) position: vec4f) -> VertexOutput
{
  var output : VertexOutput;
  output.position = position + uniform.offset;
  return output;
}

@fragment fn fragment_main() -> @location(0) vec4f {
  return uniform.color;
}
