module.exports = (bot, connector) => {
    bot.use({
        botbuilder(session, next) {
            if (process.env.FORBIDDEN === 'true') {
                session.send('Vous n\'êtes pas autorisé à parler avec moi !')
                return
            }
            next()
        },
        send(event, next) {
            //event.text += ' :)'
            next()
        }
    })
}