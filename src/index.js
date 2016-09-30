'use strict'

const multihashing = require('multihashing')

function Block (data) {
  if (!data) {
    throw new Error('Block must be constructed with data')
  }

  if (!(this instanceof Block)) {
    return new Block(data)
  }

  if (data instanceof Buffer) {
    this.data = data
  } else {
    this.data = new Buffer(data)
  }

  this.key = (hashFunc) => {
    if (!hashFunc) {
      hashFunc = 'sha2-256'
    }

    return multihashing(this.data, hashFunc)
  }
}

module.exports = Block
