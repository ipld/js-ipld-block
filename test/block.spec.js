/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const multihashing = require('multihashing')
const parallel = require('async/parallel')
const Block = require('../src')

describe('block', () => {
  const data = new Buffer('random-data')
  let hash
  before((done) => {
    multihashing(data, 'sha2-256', (err, digest) => {
      if (err) {
        return done(err)
      }

      hash = digest
      done()
    })
  })

  it('create', () => {
    const b = new Block('random-data', hash)
    expect(b.key).to.be.eql(hash)
    expect(b.data).to.exist
    expect(b.extension).to.be.eql('data')
  })

  it('create /wo new', () => {
    const b = Block('random-data', hash)
    expect(b.key).to.be.eql(hash)
    expect(b.data).to.exist
    expect(b.extension).to.be.eql('data')
  })

  it('create without hash', (done) => {
    Block.create('random-data', (err, b) => {
      expect(err).to.not.exist
      expect(b.key).to.be.eql(hash)
      expect(b.data).to.exist
      expect(b.extension).to.be.eql('data')
      done()
    })
  })

  it('fail to create an empty block', () => {
    expect(() => new Block()).to.throw()
  })

  it('fail to create with missing hash', () => {
    expect(() => new Block('hello')).to.throw()
  })

  it('2 different blocks have different hashes', (done) => {
    parallel([
      (cb) => Block.create('random-data', cb),
      (cb) => Block.create('more-random-data', cb)
    ], (err, blocks) => {
      expect(err).to.not.exist
      expect(blocks[0]).to.not.deep.equal(blocks[1])
      done()
    })
  })

  it.skip('block stays immutable', () => {
    // it from the original implementation
    // It doesn't stricly verify the immutability of the Block object
    const block = new Block("Can't change this!")
    let key = block.key
    key = new Buffer('new key')

    expect(key.equals(block.key)).to.equal(false)
  })

  it('has the right extension to type mapping', (done) => {
    parallel([
      (cb) => Block.create('hello', 'protobuf', cb),
      (cb) => Block.create('hello', cb),
      (cb) => Block.create('hello', 'ipld', cb),
      (cb) => Block.create('hello', 'woot', cb)
    ], (err, b) => {
      expect(err).to.not.exist

      expect(b[0].type).to.be.eql('protobuf')
      expect(b[0].extension).to.be.eql('data')

      expect(b[1].type).to.be.eql('protobuf')
      expect(b[1].extension).to.be.eql('data')

      expect(b[2].type).to.be.eql('ipld')
      expect(b[2].extension).to.be.eql('ipld')

      expect(b[3].type).to.be.eql('woot')
      expect(b[3].extension).to.be.eql('woot')
      done()
    })
  })
})
