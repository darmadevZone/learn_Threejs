varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

void main() {
    float time = uTick * 0.01;
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    gl_FragColor = color;
}