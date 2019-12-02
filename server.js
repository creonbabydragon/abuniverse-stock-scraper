const express = require('express')
const fs      = require('fs')
const path    = require('path')
const { EventEmitter } = require('events')

const scraper = require('./utils/scraper')
const { products, port, paths } = require('./project')

// allow multiple async functions
EventEmitter.defaultMaxListeners = Infinity

// start Express app
const app = express()
app.use(express.static(path.join(`${__dirname}public`)))

app.get('/', async () => {
  // Scrape all Pages
  const scrapeTargets = products.map(scraper.scrapeProduct)
  const stock = await Promise.all(scrapeTargets)
  console.log(stock)

  // Write results to JSON File
  const publicPath = paths.public.split(':file')[0]
  const fileName   = paths.public.replace(/:file/, 'stock.json')

  console.log(`Writing to ${fileName}`)
  if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath)
  fs.writeFileSync(fileName, JSON.stringify(stock, null, 2))
})

console.log(`Server running at http://localhost:${port}`)
app.listen(port)
