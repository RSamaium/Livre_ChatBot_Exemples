const users = require('../core/users')

module.exports = (bot) => {
    bot.dialog('proactive', (session, args) => {
        const { message } = session
        users.saveAddress(message.address)
        session.endDialog('Ok, je vous enverrai des notifications !')
    }).triggerAction({ matches: /notification/i })
}