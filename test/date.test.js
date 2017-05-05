import * as date from '../src/js/date'
describe('date', () => {
  it('formatDate', () => {
    assert.equal(date.formatDate(new Date('2016/06/25')), '2016-06-25', '一位的月份')
    assert.equal(date.formatDate(new Date('2016/06/5')), '2016-06-05', '一位的日期')
    assert.equal(date.formatDate(new Date('2016/10/25')),'2016-10-25', '两位的月份')
    assert.equal(date.formatDate(new Date('2016/06/25')), '2016-06-25', '两位的日期')
  })
  it('dateCheck', () => {
    assert.ok(date.dateCheck(new Date('2016/10/20'), new Date('2017/10/20')))
    assert(date.dateCheck(new Date('2016/10/20'), new Date('2015/10/20')) === false)
    let now = Date.now()
    assert.ok(date.dateCheck(now, now))
  })
  it('dateGap', () => {

    let pdate = new Date('1996/08/16')
    //we break up
    let zdate = new Date('1996/06/25')

    let pdateTommorrow = new Date('1996/08/17')
    assert.throws(() => {
      date.dateGap(pdateTommorrow, pdate)
  }, 'startDate should early then endDate')

    assert.deepEqual(date.dateGap(new Date('1996/08/16'), new Date('1996/08/16')),['1996-08-16'] , '传入相同日期返回有这个日期的数组')
    assert.deepEqual(date.dateGap(pdate, pdateTommorrow), ['1996-08-16','1996-08-17'],'传入相邻的两天)')
    assert.deepEqual(date.dateGap(new Date('2016-7-30'), new Date('2016-8-1')),['2016-07-30', '2016-07-31', '2016-08-01'] ,'跨月')
  })
})