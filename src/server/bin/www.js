const app = require('../app')
const connector = require('../../setup/chat-connector')
const bot = require('../../setup/bot')(connector)

app.post('/botframework/receive', connector.listen())

app.listen(process.env.PORT || 3000,  () => {
  console.log('app run')
})

module.exports = app
