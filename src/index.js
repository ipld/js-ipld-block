'use strict'

const CID = require('cids')

/**
 * Represents an immutable block of data that is uniquely referenced with a cid.
 *
 * @constructor
 * @param {Buffer} data - The data to be stored in the block as a buffer.
 * @param {CID} cid - The cid of the data
 *
 * @example
 * const block = new Block(new Buffer('a012d83b20f9371...'))
 */
class Block {
  constructor (data, cid) {
    if (!data || !Buffer.isBuffer(data)) {
      throw new Error('data must be a buffer')
    }

    if (!cid || !CID.isCID(cid)) {
      throw new Error('cid must be a CID')
    }

    this._data = data
    this._cid = cid
  }

  get data () {
    return this._data
  }

  set data (val) {
    throw new Error('Tried to change an immutable block')
  }

  get cid () {
    return this.cid
  }

  set cid (val) {
    throw new Error('Tried to change an immutable block')
  }

  /**
   * Check if the given value is a Block.
   *
   * @param {any} other
   * @returns {bool}
   */
  static isBlock (other) {
    return other && other.constructor.name === 'Block'
  }
}

module.exports = Block
