'use strict'

var commandEndpoints = [
  'vert',
  'frag',
  'uniforms.*',
  'attributes.*',
  'context.*',
  'primitive',
  'count',
  'offset',
  'instances',
  'elements',
  'framebuffer',
  'profile',
  'depth.enable',
  'depth.mask',
  'depth.range',
  'depth.func',
  'blending.enable',
  'blending.equation',
  'blending.func',
  'blending.color',
  'stencil.enable',
  'stencil.mask',
  'stencil.func',
  'stencil.opFront',
  'stencil.opBack',
  'stencil.op',
  'polygonOffset.enable',
  'polygonOffset.offset',
  'cull.enable',
  'cull.face',
  'frontFace',
  'dither',
  'lineWidth',
  'colorMask',
  'sample.enable',
  'sample.alpha',
  'sample.coverage.value',
  'sample.coverage.invert',
  'scissor.enable',
  'scissor.box.x',
  'scissor.box.y',
  'scissor.box.width',
  'scissor.box.height',
  'viewport.x',
  'viewport.y',
  'viewport.width',
  'viewport.height',
];

var bufferEndpoints = [
  'data',
  'length',
  'usage',
  'type',
];

var elementEndpoints = [
  'data',
  'usage',
  'length',
  'primitive',
  'type',
  'count'
]

var textureEndpoints = [
  'width',
  'height',
  'mag',
  'min',
  'wrapS',
  'wrapT',
  'aniso',
  'format',
  'type',
  'data',
  'mipmap',
  'flipY',
  'alignment',
  'premultiplyAlpha',
  'colorSpace',
  'channels',
];

var renderbufferEndpoints = [
  'format',
  'width',
  'height',
  'shape',
  'radius'
]

var framebufferEndpoints = [
  'width',
  'height',
  'color',
  'depth',
  'stencil',
  'depthStencil',
  'colorFormat',
  'colorType',
  'colorCount',
  'depthTexture'
]

var framebufferCubeEndpoints = [
  'radius',
  'color',
  'colorFormat',
  'colorType',
  'colorCount',
  'depth',
  'stencil',
  'depthStencil'
]

function makeExtend (schema) {
  function extendMutable (a, b, path) {
    var propName, value, propPath, dest, nestedPropName, type;

    for (propName in b) {
      if (!b.hasOwnProperty(propName)) continue;

      value = b[propName];
      propPath = (path.length > 0 ? (path + '.') : '') + propName;

      if (schema.indexOf(propPath) !== -1) {
        a[propName] = value
      } else if (schema.indexOf(propPath + '.*') !== -1) {
        dest = a[propName];

        if (!dest) dest = a[propName] = {};

        for (nestedPropName in value) {
          dest[nestedPropName] = value[nestedPropName];
        }
      } else if (typeof b === 'object' && typeof value === 'object') {
        type = typeof a[propName];
        if (type === 'undefined' || type !== 'object') {
          a[propName] = {};
        }

        extendMutable(a[propName], value, propPath)
      }
    }
  }

  return function () {
    var newObj = {};

    for (var i = 0; i < arguments.length; i++) {
      extendMutable(newObj, arguments[i], '');
    }

    return newObj;
  }
}

module.exports.command = makeExtend(commandEndpoints);
module.exports.buffer = makeExtend(bufferEndpoints);
module.exports.element = makeExtend(elementEndpoints);
module.exports.texture = makeExtend(textureEndpoints);
module.exports.renderbuffer = makeExtend(renderbufferEndpoints);
module.exports.framebuffer = makeExtend(framebufferEndpoints);
module.exports.framebufferCube = makeExtend(framebufferCubeEndpoints);

