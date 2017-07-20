const path = require('path')

module.exports = {
  platforms: {
    botframework: {
      id: '',
      token: ''
    },
    facebook: {
      token: ''
    }
  },
  bingmap: {
    key: ''
  },
  url: 'https://mychatbot.localtunnel.me',
  publicPath: path.join(__dirname, '../server/public'),
  localizerSettings: {
    botLocalePath: './src/locale',
    defaultLocale: 'en'
  }
}
