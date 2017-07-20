const builder = require('botbuilder')
const assert = require('assert')
const setup = require('../src/setup/bot')

describe('Conversation /dialog', () => {

    let connector, bot

    beforeEach(() => {
        connector = new builder.ConsoleConnector()
        bot = setup(connector)
    })

    it('Tester les dialogues', (done) => {
        let step = 0
        bot.on('send', (message) => {
            const { text } = message
            switch (++step) {
                case 1:
                    assert.equal(text, 'Je suis ChatBot !')
                    break
                case 2:
                    assert.equal(text, 'Bonjour')
                    break
                case 3:
                    assert.equal(text, 'Comment vas-tu ?')
                    break
                case 4:
                    assert.equal(text, 'Mon but est juste de discuter')
                    done()
                    break
            }
        })
        connector.processMessage('ya')
    })

})