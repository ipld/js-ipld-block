'use strict'

const multihashing = require('multihashing-async')

module.exports = Block

// Immutable block of data
function Block (data) {
  if (!(this instanceof Block)) {
    return new Block(data)
  }

  if (!data) {
    throw new Error('Block must be constructed with data')
  }

  this.data = ensureBuffer(data)

  this.key = (hashFunc, callback) => {
    if (typeof hashFunc === 'function') {
      callback = hashFunc
      hashFunc = null
    }

    if (!hashFunc) {
      hashFunc = 'sha2-256'
    }

    multihashing(this.data, hashFunc, callback)
  }
}

function ensureBuffer (data) {
  if (Buffer.isBuffer(data)) {
    return data
  }

  return new Buffer(data)
}
