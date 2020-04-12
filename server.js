const express = require('express')
const fs      = require('fs')
const path    = require('path')
const puppeteer = require('puppeteer')
const { EventEmitter } = require('events')

const scraper = require('./utils/scraper')
const { products, port, paths } = require('./project')

// allow multiple async functions
EventEmitter.defaultMaxListeners = Infinity

// start Express app
const app = express()
app.use(express.static(path.join(`${__dirname}public`)))

app.get('/', async (request, response) => {
  const timeStart = Date.now()
  let stock

  // Create a browser
  const browser = await puppeteer.launch({
    headless: true,
  })

  // Scrape all Pages
  const scrapeTargets = products.map(product => scraper.scrapeProduct(browser, product))
  try {
    stock = await Promise.all(scrapeTargets)
  } catch (error) {
    console.log(error)
    return
  }


  await browser.close()

  const elapsedTime = Date.now() - timeStart
  console.log(`Scraped ${products.length} products in ${elapsedTime / 1000}s`)

  // Write results to JSON File
  const publicPath = paths.public.split(':file')[0]
  const fileName   = paths.public.replace(/:file/, 'stock.json')

  console.log(`Writing to ${fileName}`)
  if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath)
  fs.writeFileSync(fileName, JSON.stringify(stock, null, 2))

  response.send(stock)
})

console.log(`Server running at http://localhost:${port}`)
app.listen(port)
app.set('json spaces', 2)
