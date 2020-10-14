/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const CID = require('cids')
const uint8ArrayFromString = require('uint8arrays/from-string')

const Block = require('../src')

describe('block', () => {
  it('create throws', () => {
    expect(
      () => new Block('string')
    ).to.throw()

    expect(
      () => new Block(uint8ArrayFromString('hello'), 'cid')
    ).to.throw()

    expect(
      () => new Block('hello', new CID('QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'))
    ).to.throw()
  })

  it('create', () => {
    const b = new Block(uint8ArrayFromString('hello'), new CID('QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'))

    expect(Block.isBlock(b)).to.eql(true)
  })

  it('block stays immutable', () => {
    const b = new Block(uint8ArrayFromString('hello'), new CID('QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'))

    expect(
      () => { b.data = 'fail' }
    ).to.throw(
      /read.only/
    )

    expect(
      () => { b.cid = 'fail' }
    ).to.throw(
      /read.only/
    )
  })
})
