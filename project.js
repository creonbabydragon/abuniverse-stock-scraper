module.exports = {
  images: [
    { label: 'in-stock', image: 'Stock_Indicator_Check.png' },
    { label: 'low-stock', image: 'Auto_Stock_Display_low_stock.png' },
    { label: 'no-stock', image: 'Stock_Indicator_X.png' },
  ],
  paths: {
    product: 'https://us.abuniverse.com/product/:id/',
    public: './public/:file',
  },
  products: [
    { name: 'Cushies',                id: 'cus',   tapes: '2 tape'      },
    { name: 'Kiddo By ABU',           id: 'kdo',   tapes: '2 tape'      },
    { name: 'Super Dry Kids',         id: 'sdk',   tapes: '2 tape'      },
    { name: 'ABU BareBum',            id: 'bbv',   tapes: '4 tape'      },
    { name: 'ABU Simple',             id: 'whi',   tapes: '4 tape'      },
    { name: 'ABU Space',              id: 'spc',   tapes: '4 tape'      },
    { name: 'Little Paws',            id: 'pwz',   tapes: '4 tape'      },
    { name: 'PeekABU',                id: 'pab',   tapes: '4 tape'      },
    { name: 'PreSchool Cloth-Backed', id: 'prs',   tapes: '4 tape'      },
    { name: 'PreSchool Plastic',      id: 'prp',   tapes: '4 tape'      },
    { name: 'Simple Ultra',           id: 'siu',   tapes: '4 tape'      },
    { name: 'BunnyHopps',             id: 'bny',   tapes: 'hook & loop' },
    { name: 'DinoRawrZ',              id: 'dno',   tapes: 'hook & loop' },
  ],
  port: process.env.Port || 3000,
}
