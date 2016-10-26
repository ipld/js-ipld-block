/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const parallel = require('async/parallel')
const mh = require('multihashes')

const Block = require('../src')

function expectKey (block, hashFn, expectedKey, callback) {
  const cb = (err, key) => {
    if (err) {
      return callback(err)
    }
    expect(mh.toB58String(key)).to.be.eql(expectedKey)
    callback()
  }

  if (typeof expectedKey === 'function') {
    callback = expectedKey
    expectedKey = hashFn
    block.key(cb)
  } else {
    block.key(hashFn, cb)
  }
}

describe('block', () => {
  it('create', (done) => {
    const b = new Block('random-data')
    expect(b.data).to.exist
    parallel([
      (cb) => expectKey(b, 'QmeoBGh5g5kHgK3xppJ1YPwB9xgH2GoqhMSuQVpzDdvtJG', cb),
      (cb) => expectKey(b, 'sha1', '5dsvLgRV9RVj9eSgtxMrXQjbpfFeHY', cb)
    ], done)
  })

  it('create /wo new', (done) => {
    const b = Block('random-data')
    expect(b.data).to.exist
    parallel([
      (cb) => expectKey(b, 'QmeoBGh5g5kHgK3xppJ1YPwB9xgH2GoqhMSuQVpzDdvtJG', cb),
      (cb) => expectKey(b, 'sha1', '5dsvLgRV9RVj9eSgtxMrXQjbpfFeHY', cb)
    ], done)
  })

  it('fail to create an empty block', () => {
    expect(() => new Block()).to.throw()
  })

  it('2 different blocks have different hashes', (done) => {
    const b1 = new Block('random-data')
    const b2 = new Block('more-random-data')

    parallel([
      (cb) => b1.key(cb),
      (cb) => b2.key(cb)
    ], (err, keys) => {
      expect(err).to.not.exist
      expect(keys[0]).to.not.deep.equal(keys[1])
      done()
    })
  })

  it.skip('block stays immutable', () => {
    // it from the original implementation
    // It doesn't stricly verify the immutability of the Block object
    const block = new Block("Can't change this!")
    let key = block.key()
    key = new Buffer('new key')

    expect(key.equals(block.key())).to.equal(false)
  })
})
