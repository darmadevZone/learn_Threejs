precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex;
uniform float uProgress;

void main() {

  vec4 tex = texture(uTex, vUv);
  
  gl_FragColor = tex;
}