import * as utils from '../src/js/utils'

describe('utils', () => {
  it('objHas', () => {
    assert(utils.objHas({ a: 123 }, 'a'))
    assert(!utils.objHas({}, 'p'))
  })
  it('sortByKey', () => {
    assert.deepEqual(utils.sortByKey({
      a: {
        value: 1,
        name: 'a'
      },
      b: {
        name: 'b',
        value: 3
      },
      c: {
        name: 'c',
        value: 2
      }
    }, 'value'),[{"name":"b","value":3},{"name":"c","value":2},{"value":1,"name":"a"}] )
  })
})
