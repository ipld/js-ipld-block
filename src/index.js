'use strict'

const multihashing = require('multihashing-async')

// Immutable block of data
function Block (data, key, type) {
  if (!data) {
    throw new Error('Block must be constructed with data')
  }

  if (!key || !Buffer.isBuffer(key)) {
    throw new Error('Block must be constructed with a hash')
  }

  if (!(this instanceof Block)) {
    return new Block(data, key, type)
  }

  this.data = ensureBuffer(data)

  this.key = key
  this.type = type || 'protobuf'
}

Object.defineProperty(Block.prototype, 'extension', {
  get () {
    switch (this.type) {
      case 'protobuf':
        return 'data'
      case 'ipld':
        return 'ipld'
      default:
        return this.type
    }
  }
})

Block.create = (data, type, callback) => {
  if (typeof type === 'function') {
    callback = type
    type = undefined
  }

  data = ensureBuffer(data)
  multihashing(data, 'sha2-256', (err, digest) => {
    if (err) {
      return callback(err)
    }

    callback(null, new Block(data, digest, type))
  })
}

function ensureBuffer (data) {
  if (Buffer.isBuffer(data)) {
    return data
  }

  return new Buffer(data)
}

module.exports = Block
