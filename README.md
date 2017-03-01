# regl-extend

> [regl](https://github.com/regl-project/regl)-aware deep extend

## Introduction

This module adds simple awareness of valid regl properties to a deep extend function. The intention is to DRY up commands like a fullscreen triangle, for example, that require highly redundant boilerplate, however little.

# Installation

```bash
# Not yet published
# npm install regl-extend
```

## Example

The example below illustrates using regl-extend to create a template. A normal deep extend runs the risk of recursing into data or arrays. `regl-extend` heads this off and ensures any properties of which regl is aware are simply copied.

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

#### `require('regl-extend').command(a, b[, ...])
#### `require('regl-extend').buffer(a, b[, ...])
#### `require('regl-extend').element(a, b[, ...])
#### `require('regl-extend').texture(a, b[, ...])
#### `require('regl-extend').renderbuffer(a, b[, ...])
#### `require('regl-extend').framebuffer(a, b[, ...])
#### `require('regl-extend').framebufferCube(a, b[, ...])

Each method extends the properties of the corresponding `regl` command. The values of any valid properties for that command are transferred. The recursion stops at data values like a regl resource or a bare array. Each successive object provided overwrites existing properties. The function returns a new object with the merged contents. Unknown properties are ignored.

### License

&copy; 2017 Ricky Reusser. MIT License.
