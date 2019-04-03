const agent = require('puppeteer')
const path = require('path')
const fs = require('fs')
const { Website } = require('../models')
const { Available } = require('../models')
// const syetemconfig = require('../../config/systemconfig')
const stringSimilarity = require('string-similarity')
exports.bot = async function (website) {
  try {
    let browser = await agent.launch()
    let page = await browser.newPage()
    await page.setViewport({
      width: 1920,
      height: 1080
    })
    await page.goto(website.url)
    // update website
    let now = Date.now()
    let filename = website.name + '_' + now + '.png'
    let filepath = path.join('img', filename)
    if (!fs.existsSync('img')) {
      fs.mkdirSync('img')
    }
    await page.screenshot({ path: filepath })
    let update = {}
    // titlt check
    let title = await page.evaluate(
      () => document.title
    )
    // content check
    let content = await page.content()
    // images check
    let images = await page.evaluate(
      () => Array.from(document.images).map(img => img.outerHTML)
    )
    let scripts = await page.evaluate(
      () => Array.from(document.scripts).map(sc => sc.outerHTML)
    )
    if (title && content && images && scripts) {
      // console.log()
    }
    const performance = JSON.parse(await page.evaluate(
      () => JSON.stringify(window.performance.timing)
    ))
    let reponseTime = (performance.responseEnd - performance.responseStart)
    await Available.create({ websiteID: website.id, responseTime: reponseTime })
    await browser.close()
    // console.log(website.name + ':' + status)
    if (website.stable == null) {
      update.stable = content
    } else {
      let ratio = stringSimilarity.compareTwoStrings(website.stable, content)
      if (ratio < 0.8) {
        update.level = 1
      } else if (ratio < 0.6) {
        update.level = 2
      } else if (ratio < 0.5) {
        update.level = 3
      }
      console.log('name: ' + website.name)
      console.log('ratio: ' + ratio)
      console.log('level: ' + update.level)
    }
    update.prev = website.current
    update.current = content
    update.screenshot = filename
    await Website.update(update, { where: { id: website.id } })
    if (website.screenshot != null) {
      fs.unlink(path.join('img', website.screenshot), (err) => { console.log(err) })
    }
    console.log('autobot updated')
  } catch (error) {
    console.log(error)
  }
}
