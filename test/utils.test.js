import * as utils from '../src/js/utils'

describe('utils', () => {
  it('objHas', () => {
    assert(utils.objHas({a:123}, 'a'))
    assert(!utils.objHas({}, 'p'))
  })
})