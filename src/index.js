'use strict'

const CID = require('cids')
const withIs = require('class-is')

/**
 * Represents an immutable block of data that is uniquely referenced with a cid.
 *
 * @example
 * const block = new Block(Uint8Array.from([0, 1, 2, 3]), new CID('...'))
 */
module.exports = class Block {
  /**
   * @constructor
   * @param {Uint8Array} data - The data to be stored in the block as a Uint8Array.
   * @param {CID} cid - The cid of the data
   */
  constructor (data, cid) {
    if (!data || !(data instanceof Uint8Array)) {
      throw new Error('first argument  must be a Uint8Array')
    }

    if (!cid || !CID.isCID(cid)) {
      throw new Error('second argument must be a CID')
    }

    this._data = data
    this._cid = cid
  }

  /**
   * The data of this block.
   *
   * @type {Uint8Array}
   */
  get data () {
    return this._data
  }

  set data (val) {
    throw new Error('Tried to change an immutable block')
  }

  /**
   * The cid of the data this block represents.
   *
   * @type {CID}
   */
  get cid () {
    return this._cid
  }

  set cid (val) {
    throw new Error('Tried to change an immutable block')
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Check if the given value is a Block.
   * @returns {other is Block}
   */
  static isBlock (other) { // eslint-disable-line no-unused-vars
    // implemented by class-is module
  }
}

// to trick the typings engine
// https://github.com/ipld/js-ipld-block/pull/55#discussion_r478845002
module.exports = withIs(module.exports, { className: 'Block', symbolName: '@ipld/js-ipld-block/block' })
