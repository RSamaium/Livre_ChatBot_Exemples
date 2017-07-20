module.exports = (bot) => {
    bot.dialog('hello', (session, args) => {
        session.endDialog('Salut')
    }).triggerAction({ matches: /hello/i })
}