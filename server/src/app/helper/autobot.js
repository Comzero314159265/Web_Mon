const agent = require('puppeteer')
const path = require('path')
const fs = require('fs')
const { Website } = require('../models')
// const { Available } = require('../models')
const syetemconfig = require('../../config/systemconfig')
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
    let now = Date.now()
    let filename = website.name + '_' + now + '.png'
    let filepath = path.join('img', filename)
    if (!fs.existsSync('img')) {
      fs.mkdirSync('img')
    }
    await page.screenshot({ path: filepath })
    let content = await page.content()
    let title = await page.title()
    // update
    let update = {}
    await browser.close()
    if (website.title == null) {
      update.title = title
    }
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
      if (syetemconfig.title_check) {
        if (website.title !== null && website.title !== title) {
          update.level = 3
        }
      }
    }
    update.screenshot = filename
    update.current = content
    await Website.update(update, { where: { id: website.id } })
    if (website.screenshot != null) {
      fs.unlink(path.join('img', website.screenshot), (err) => { console.log(err) })
    }
    console.log('autobot updated')
  } catch (error) {
    console.log(error)
  }
}

// // const ProxyList = require('free-proxy')
// // const proxyList = new ProxyList()
// let proxies = [
//   { country: 'Indonesia', url: 'http://182.16.173.102:8080' },
//   { country: 'United States', url: 'http://157.230.149.189:80' },
//   { country: 'Germany', url: 'http://134.209.231.163:80' }
// ]

// async function uptimeCheck (proxy, website) {
//   try {
//     let browser = await agent.launch({ args: [ '--proxy-server=' + proxy.url ] })
//     let page = await browser.newPage()
//     await page.goto(website.url)
//     // let content = await page.content()
//     console.log(proxy.country)
//   } catch (error) {
//     console.log(error)
//   }
// }

// exports.pingbot = async function () {
//   try {
//     let websites = await Website.findAll({})
//     proxies.forEach(proxy => {
//       Promise.all(websites.map(website => uptimeCheck(proxy, website))).then(() => console.log('done')).catch(err => console.log(err))
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
