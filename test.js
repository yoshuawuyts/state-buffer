const test = require('tape')
const stateBuffer = require('./')

test('assert input types', function (t) {
  t.plan(1)
  t.throws(stateBuffer, /function/)
})

test('b.locked should return the locked state', function (t) {
  t.plan(1)
  const b = stateBuffer(function () {})
  console.log(Object.keys(b))
  t.equals(b.locked, false, 'locked state')
})
