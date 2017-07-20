const builder = require('botbuilder')

module.exports = (bot) => {
    bot.dialog('typing', (session) => {
        session.send('Je cherche le fichier')
        session.sendTyping()
        setTimeout(function () {
            session.send('Voici le fichier')
        }, 3000)
    }).triggerAction({ matches: /download/i })
}