import * as date from '../src/js/date'
describe('date', () => {
  it('formatDate', () => {
    assert(date.formatDate(new Date('2016/06/25')) =='2016-6-25')
    assert(date.formatDate(new Date('2016/01/25')) =='2016-1-25')
  })
  it('dateCheck', () => {
    assert.ok(date.dateCheck(new Date('2016/10/20'), new Date('2017/10/20')))
    assert(date.dateCheck(new Date('2016/10/20'), new Date('2015/10/20')) === false)
    let now = Date.now()
    assert.ok(date.dateCheck(now, now))
  })
})