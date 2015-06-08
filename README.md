# state-buffer
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Manage in-flight application state changes.

## Installation
```bash
$ npm install state-buffer
```

## Usage
```js
const buffer = require('state-buffer')

const b = buffer((data, end) => {
  // do async stuff
  end(err, res)
})

b(data, (err, res) => {
  if (err) return console.error('uh oh, error state')
  console.log('all good!')
})
```

## Retries
`state-buffer` doesn't retry when locked. Here's an example retry engine:
```js
const buffer = require('state-buffer')
const b = queue(queueHandler)

const buffer = []
b.on('overflow', val => buffer.push(val))
b.on('finish', () => {
  if (!buffer.length) return
  b(buffer.shift())
})
```

## API
### b = buffer(data, cb(end))
Create a state buffer that executes a function when called. `end` must be
called when done to unlock the buffer.

### b(data, cb)
Pass data into the state buffer, calling the callback once done. The state
buffer is locked until the callback is called, and will emit an
`'overflow'` event if multiple writes occur.

### b.on(event, cb)
Listen for events.

### locked = b.locked
Return whether or not the state buffer is locked.

## Events
```txt
error     error occurred
start     started working
finish    finished working
success   finished successfully
overflow  received data while locked
```

## Why?
Optimistic updates within your application state are dangerous if rollbacks
aren't dealt with properly. `state-buffer` manages these updates in a
non-destructive way while also taking care of race-conditions. This approach is
inspired by how
[Facebook's Relay](https://speakerdeck.com/laneyk/mutations-in-relay) handles
mutation persistance.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/state-buffer/master.svg?style=flat-square
[npm-url]: https://npmjs.org/package/state-buffer
[travis-image]: https://img.shields.io/travis/yoshuawuyts/state-buffer/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/state-buffer
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/state-buffer.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/state-buffer?branch=master
[downloads-image]: http://img.shields.io/npm/dm/state-buffer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/state-buffer
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
