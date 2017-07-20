const builder = require('botbuilder')
const conversations = require('../conversations')
const middlewares = require('../middlewares')
const locationDialog = require('botbuilder-location')
const config = require('../config')
const users = require('../core/users')

const askNameLibrary = require('../libraries/ask-name')

module.exports = (connector) => {

    const bot = new builder.UniversalBot(connector, (session) => {
        const { message } = session

        if (message.attachments && message.attachments.length > 0) {
            session.beginDialog('attachment')
        }
    })

    bot.set('localizerSettings', config.localizerSettings)

    bot.library(locationDialog.createLibrary(config.bingmap.key))

    bot.library(askNameLibrary)

    users.assignBot(bot)

    /*bot.on('conversationUpdate', (message) => {
        console.log(message)
        const { membersAdded, membersRemoved, address } = message
        if (membersAdded) {
            membersAdded.forEach(identity => {
                if (identity.id === address.bot.id) {
                    bot.beginDialog(address, 'welcome')
                }
            })
        }
        if (membersRemoved) {
            membersRemoved.forEach(identity => {
                if (identity.id === address.bot.id) {
                    bot.send({
                        type: 'message',
                        text: 'Adieu !',
                        address
                    })
                }
            })
        }
    })*/


    const assign = (object) => {
        for (let key in object) {
            object[key](bot, connector)
        }
    }

    assign(conversations)
    assign(middlewares)

    return bot
}



