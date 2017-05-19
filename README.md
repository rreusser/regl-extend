# regl-extend

> [regl](https://github.com/regl-project/regl)-aware deep extend

## Introduction

This module implements deep extend with knowledge of regl attributes so that it can avoid recursing into objects that should be treated as opaque. The intention is to make regl templates more suitable for reuse and public consumption.

## Installation

```bash
$ npm install regl-extend
```

## Example

The example below illustrates using regl-extend to create a template that maps one framebuffer to another.

```javascript
var regl = require('regl')
var extendCommand = require('regl-extend').command

var map = opts => regl(extendCommand({
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

map({
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
