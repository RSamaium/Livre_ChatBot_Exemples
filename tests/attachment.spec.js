const builder = require('botbuilder')
const assert = require('assert')
const setup = require('../src/setup/bot')
const config = require('../src/config')

describe('Conversation /attachment', () => {

    let connector, bot

    beforeEach(() => {
        connector = new builder.ConsoleConnector()
        bot = setup(connector)
    })

    it('Tester un envoi d\'une pièce jointe', (done) => {
        bot.on('send', (message) => {
            const { attachments } = message
            assert.equal(attachments.length, 1)
            assert.deepEqual(attachments[0], {
                contentUrl: `${config.publicPath}/images/photo.jpg`,
                contentType: 'image/jpeg',
                name: 'photo.jpg'
            })
            done()
        })
        connector.processMessage('photo')
    })

})