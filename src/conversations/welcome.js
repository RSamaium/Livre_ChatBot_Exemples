module.exports = (bot) => {

    bot.dialog('welcome', (session, args) => {
        session.endDialog('Bienvenue, je suis Chatbot !')
    })

    bot.dialog('firstRun', (session) => {
        session.userData.firstRun = true
        session.endDialog('Bienvenue, je suis Chatbot :D')
    }).triggerAction({
        onFindAction(context, callback) {
            if (!context.userData.firstRun) {
                callback(null, 1.1)
            } else {
                callback(null, 0.0)
            }
        }
    })
}