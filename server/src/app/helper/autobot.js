// const async = require('async')
// const axios = require('axios')
// const { Website } = require('../models')

// eslint-disable-next-line no-unused-vars
const schedule = require('node-schedule')
const scheduelname = 'fetchtest'
var rule = new schedule.RecurrenceRule()
rule.second = new schedule.Range(0, 59, 1)
function fetch () {
  console.log('work!!!')
}

exports.run = function () {
  console.log('starting ...')
  // console.log(rule)
  schedule.scheduleJob(scheduelname, rule, fetch)
}

exports.cancel = function () {
  console.log('cancel')
  let sc = schedule.scheduledJobs[scheduelname]
  sc.cancel()
}

exports.setTime = function (time) {
  // cancel
  this.cancel()
  rule.second = null
  rule.minute = new schedule.Range(0, 59, parseInt(time))
  schedule.scheduleJob(scheduelname, rule, fetch)
  // this.run()
  // set new rule
  // console.log('set time schedule to ' + time + ' minute' + scheduelname)
  // rule.second = null
  // rule.minute = new schedule.Range(0, 59, parseInt(time))
  // run
}
