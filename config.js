// @flow

export default {
  defaultHistoricalBalance: {
    current: { balance: 0 },
    tf1h: { balance: 0 },
    tf1d: { balance: 0 },
    tf7d: { balance: 0 }
  },
  targetPortfolio: {
    smallGroup: 'Other (< 1%)'
  },
  exchanges: {
    options: [
      { value: 'quadrigacx', label: 'QuadrigaCX' },
      { value: 'bittrex', label: 'Bittrex' },
      { value: 'kraken', label: 'Kraken' },
      { value: 'binance', label: 'Binance' }
    ]
  },
  settings: {
    baseFiat: 'USD',
    // NOTE List of currencies supported by fixer.io, minus what's not supported
    // in CMC.
    baseFiatOptions: [
      'AUD',
      // 'BGN',
      'BRL',
      'CAD',
      'CHF',
      'CNY',
      'CZK',
      'DKK',
      'EUR',
      'GBP',
      'HKD',
      // 'HRK',
      'HUF',
      'IDR',
      'ILS',
      // 'INR',
      // 'ISK',
      'JPY',
      'KRW',
      'MXN',
      'MYR',
      'NOK',
      'NZD',
      'PHP',
      'PLN',
      // 'RON',
      'RUB',
      'SEK',
      'SGD',
      'THB',
      'TRY',
      'USD',
      'ZAR'
    ],
    minAssetBalance: 1,
    minimumBalanceOptions: [1, 10, 100]
  },
  ccxtRateLimit: 1000,
  corsProxyURL: 'http://localhost:8080/'
}
