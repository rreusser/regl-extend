# regl-extend

> [regl](https://github.com/regl-project/regl)-aware deep extend

## Introduction

This module adds simple awareness of valid regl properties to a deep extend function. The intention is to DRY up commands like a GPGPU-style command, for example, that require highly redundant boilerplate, however little. The only difference between this and regular deep extend (which is probably usually totally fine) is that it allows you to override properties without recursing into arrays or regl resources that should treated as opaque, making regl templates more suitable for reuse and public consumption.

# Installation

```bash
# Not yet published
# npm install regl-extend
```

## Example

The example below illustrates using regl-extend to create a template. This isn't a particularly interesting case, but it adds a bit of safety to a common use case.

```javascript
var regl = require('regl')
var extendCommand = require('regl-extend').command

function operatorFromTemplate (opts) {
  return regl(extendCommand({
    vert: `
      precision mediump float;
      attribute vec2 xy; 
      varying vec2 uv; 
      void main () {
        uv = 0.5 * (1.0 + xy);
        gl_Position = vec4(xy, 0, 1); 
      }   
    `, 
    attributes: {xy: [[-4, -4], [0, 4], [4, -4]]},
    depth: {enable: false},
    count: 3
  }, opts))
}

operatorFromTemplate({
  frag: `
    precision mediump float;
    varying vec2 uv; 
    uniform sampler2D src;
    void main () {
      vec4 color = texture2D(src, uv);
      gl_FragColor = vec4(uv, 0, 1); 
    }  
  `,
  uniforms: {src: regl.prop('src')}
})

// => regl({
//   vert: `
//     precision mediump float;
//     attribute vec2 xy; 
//     varying vec2 uv; 
//     void main () {
//       uv = 0.5 * (1.0 + xy);
//       gl_Position = vec4(xy, 0, 1); 
//     }   
//   `, 
//   frag: `
//     precision mediump float;
//     varying vec2 uv; 
//     uniform sampler2D src;
//     void main () {
//       vec4 color = texture2D(src, uv);
//       gl_FragColor = vec4(uv, 0, 1); 
//     }  
//   `,
//   attributes: {xy: [[-4, -4], [0, 4], [4, -4]]},
//   uniforms: {src: regl.prop('src')}
//   depth: {enable: false},
//   count: 3
// })
```

## API

#### `require('regl-extend').command(a, b[, ...])`
#### `require('regl-extend').buffer(a, b[, ...])`
#### `require('regl-extend').element(a, b[, ...])`
#### `require('regl-extend').texture(a, b[, ...])`
#### `require('regl-extend').renderbuffer(a, b[, ...])`
#### `require('regl-extend').framebuffer(a, b[, ...])`
#### `require('regl-extend').framebufferCube(a, b[, ...])`

Each method extends the properties of a sequence of arguments, returning a new object with the merged contents. The values of any valid properties for that command are transferred. The recursion stops at data values like a regl resource or a bare array. Each successive object provided overwrites existing properties of the result. Unknown properties are ignored.

### License

&copy; 2017 Ricky Reusser. MIT License.
