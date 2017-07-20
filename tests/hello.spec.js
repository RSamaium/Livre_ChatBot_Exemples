const builder = require('botbuilder')
const assert = require('assert')
const setup = require('../src/setup/bot')

describe('Conversation /hello', () => {

    let connector, bot

    beforeEach(() => {
        connector = new builder.ConsoleConnector()
        bot = setup(connector)
    })

    it('Tester la réponse simple', (done) => {
        bot.on('send', (message) => {
            const { text } = message
            assert.equal(text, 'Salut')
            done()
        })
        connector.processMessage('hello')
    })

})