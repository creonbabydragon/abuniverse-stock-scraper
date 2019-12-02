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
  // const stock = []

  // iterate over each project and scrape
  // TODO: explore solutions with Promise.all() to run these asynchronously
  // for (let index = 0; index < products.length; index += 1) {
  //   const product = products[index]

  //   console.log(`Scraping ${product.name}`)
  //   stock.push(await scraper.scrapeProduct(product))
  // }

  const scrapeTargets = products.map(scraper.scrapeProduct)
  console.log(scrapeTargets)

  // const publicPath = paths.public.split(':file')[0]
  // const fileName   = paths.public.replace(/:file/, 'stock.json')

  // // Write results to JSON File
  // console.log(`Writing to ${fileName}`)
  // if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath)

  // fs.writeFileSync(fileName, JSON.stringify(stock, null, 2))
})

console.log(`Server running at http://localhost:${port}`)
app.listen(port)
