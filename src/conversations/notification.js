module.exports = (bot) => {
    bot.dialog('notification', (session, args) => {
        session.endDialog(args.text)
    })
}