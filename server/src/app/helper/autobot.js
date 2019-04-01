const agent = require('puppeteer')
const path = require('path')
const fs = require('fs')
const { Website } = require('../models')
exports.bot = async function (website) {
  try {
    let browser = await agent.launch()
    let page = await browser.newPage()
    await page.goto(website.url)
    await page.setViewport({
      width: 1920,
      height: 1080
    })
    // update website
    let now = Date.now()
    let filename = website.name + '_' + now + '.png'
    let filepath = path.join('img', filename)
    let oldimg = website.screenshot
    if (oldimg) {
      fs.unlink(path.join('img', oldimg), (err) => console.log(err))
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
      console.log()
    }
    console.log(title)
    await browser.close()
    if (!website.stable) {
      update.stable = content
    }
    update.current = content
    update.screenshot = filename
    await Website.update(update, { where: { id: website.id } })
  } catch (error) {
    console.log(error)
  }
}
