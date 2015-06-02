const test = require('tape')
const stateBuffer = require('./')

test('assert input types', function (t) {
  t.plan(1)
  t.throws(stateBuffer, /function/)
})
