const assert = require('assert')

module.exports = StateBuffer

// create a new stateBuffer
// fn -> fn
function StateBuffer (worker) {
  if (!(this instanceof StateBuffer)) return new StateBuffer(worker)
  assert.equal(typeof worker, 'function')
  this.lock = false

  return buffer

  // create buffer fn that can
  // be called to buffer data
  // any, fn -> null
  function buffer (data, cb) {
    worker(data, cb)
  }
}

// return the locked state
// null -> bool
Object.defineProperty(StateBuffer.prototype, 'locked', {
  get: function lockedGetter () {
    console.log('fn called')
    return this.lock
  }
})
