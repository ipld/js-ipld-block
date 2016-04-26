IPFS Block JavaScript Implementation
====================================

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Travis CI](https://travis-ci.org/ipfs/js-ipfs-block.svg?branch=master)](https://travis-ci.org/ipfs/js-ipfs-block)
[![Circle CI](https://circleci.com/gh/ipfs/js-ipfs-block.svg?style=svg)](https://circleci.com/gh/ipfs/js-ipfs-block)
[![Coverage Status](https://coveralls.io/repos/github/ipfs/js-ipfs-block/badge.svg?branch=master)](https://coveralls.io/github/ipfs/js-ipfs-block?branch=master)
[![Dependency Status](https://david-dm.org/ipfs/js-ipfs-block.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfs-block)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> [IPFS][ipfs] implementation of the Block data structure in JavaScript.

## Description

**Block** - A block is a blob of binary data.

## Example

```js
const Block = require('ipfs-block')

// create a block
const block = new Block('hello world')
console.log(block.data)
console.log(block.key)
```

## Installation

### npm

```sh
> npm i ipfs-block
```

## Setup

### Node.js

```js
const Block = require('ipfs-block')
```

### Browser: Browserify, Webpack, other bundlers

The code published to npm that gets loaded on require is in fact a ES5
transpiled version with the right shims added. This means that you can require
it and use with your favourite bundler without having to adjust asset management
process.

```js
var Block = require('ipfs-block')
```

### Browser: `<script>` Tag

Loading this module through a script tag will make the `IpfsBlock` obj available in
the global namespace.

```html
<script src="https://npmcdn.com/ipfs-block/dist/index.min.js"></script>
<!-- OR -->
<script src="https://npmcdn.com/ipfs-block/dist/index.js"></script>
```

## API

```js
const Block = require('ipfs-block')
```

### Block

#### `new Block(data, [type])`

Creates a new block with raw data `data`. `type` can be either `'protobuf'` or `'ipld'`

#### `block.data`

The raw data of the block. Its format matches whatever was provided in its
constructor.

#### `block.key`

The [multihash][multihash] of the block's data, as a buffer.


### `block.extension`

The extension on how to store the blog, depends on the type:

- `'protobuf'`: `'data'`
- `'ipld'`: `'ipld'`

## License

MIT

[ipfs]: https://ipfs.io
[multihash]: https://github.com/jbenet/js-multihash
