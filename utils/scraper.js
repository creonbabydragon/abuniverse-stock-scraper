const puppeteer = require('puppeteer')
const project = require('../project')

const scrapeProduct = async (product) => {
  const { images, paths } = project
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Block resources to increase performance
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    const blockedTypes = ['image', 'stylesheet', 'font', 'script']
    if (blockedTypes.includes(request.resourceType())) {
      request.abort()
    } else {
      request.continue()
    }
  })

  // Go to product page
  const productPage = paths.product.replace(/:id/, product.id)
  console.log(`(${productPage})\n`)
  await page.goto(productPage)

  const scrapedData = await page.evaluate((product, images) => {
    const getIndicator = (image) => {
      if (!image || typeof image !== 'string') return null
      const matchedIndicator = images.find((item) => image.includes(item.image))
      return (matchedIndicator) ? matchedIndicator.label : null
    }

    const displayMarkers = document.querySelector('.abu_product_stock_display_markers')
    const small = displayMarkers.querySelector('img[alt*="Small"]')
    const medium = displayMarkers.querySelector('img[alt*="Medium"]')
    const large = displayMarkers.querySelector('img[alt*=" Large"]')
    const xLarge = displayMarkers.querySelector('img[alt*="XLarge"]')

    const data = {
      ...product,
      stock: {
        small: small && getIndicator(small.src),
        medium: medium && getIndicator(medium.src),
        large: large && getIndicator(large.src),
        xLarge: xLarge && getIndicator(xLarge.src),
      },
    }

    return data
  }, product, images)

  await browser.close()
  return scrapedData
}

module.exports.scrapeProduct = scrapeProduct
