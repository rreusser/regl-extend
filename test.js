'use strict'

var test = require('tape')
var extend = require('./')

test('command', function (t) {
  var a = {
    vert: 'a',
    uniforms: {
      foo: 'a',
      bar: {a: 'b', c: 'd'}
    },
    scissor: {
      box: {
        x: 1,
        y: 2
      }
    }
  }

  var b = {
    vert: 'b',
    frag: 'c',
    uniforms: {
      foo: 'b',
      bop: 'f',
      bar: {a: 'c', d: 'e'}
    },
    attributes: {
      bar: {a: 'b'}
    },
    scissor: {
      enable: false,
      box: {
        y: 4,
        width: 2
      }
    },
    garbage: 'please'
  }

  var c = {
    scissor: {
      enable: true
    }
  }

  var result = extend.command(a, b, c)

  t.deepEqual(result, {
    vert: 'b',
    frag: 'c',
    uniforms: {
      foo: 'b',
      bop: 'f',
      bar: {a: 'c', d: 'e'}
    },
    attributes: {
      bar: {a: 'b'}
    },
    scissor: {
      enable: true,
      box: {
        x: 1,
        y: 4,
        width: 2
      }
    }
  })

  t.end()
})
