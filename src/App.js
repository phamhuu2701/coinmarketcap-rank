import logo from './logo.svg'
import './App.css'
import { useEffect } from 'react'

const getData = () => {
  fetch(
    'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=100&sortBy=market_cap&sortType=desc',
  )
    .then((response) => response.json())
    .then((res) => {
      let data = res.data.cryptoCurrencyList

      data = data.map((item) => {
        let price = item.quotes.find((_item) => _item.name === 'USD')?.price || 0
        price = Math.floor(price)

        return {
          name: item.name,
          symbol: item.symbol,
          slug: item.slug,
          url: `https://coinmarketcap.com/currencies/${item.slug}/`,
          cmcRank: item.cmcRank,
          price,
        }
      })

      data.sort((a, b) => (a.cmcRank < b.cmcRank ? -1 : a.cmcRank > b.cmcRank ? 1 : 0))

      let str = ''
      for (let i = 0; i < data.length; i++) {
        let selected = data[i]
        str +=
          selected.cmcRank +
          '\t' +
          selected.name +
          '\t' +
          selected.symbol +
          '\t' +
          selected.url +
          '\t' +
          selected.price +
          '\n'
      }
      console.log(str)
    })
}

function App() {
  useEffect(() => {
    getData()
  }, [])
  return <div className="App">Open console log (F12)</div>
}

export default App
