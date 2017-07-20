const builder = require('botbuilder')

module.exports = (bot) => {
    bot.dialog('loopDialog', [
        (session, args) => {
            builder.Prompts.confirm(session, 'M\'aimes-tu ?')
        },
        (session, args) => {
            const { response } = args
            if (response) {
                return session.endDialog('merci :D')
            }
            session.replaceDialog('loopDialog')
        }
    ]).triggerAction({
        matches: /loop/i
    }).reloadAction('reloadLoopDialog', 'Si tu veux...', {
        matches: /^recommence$/i,
        confirmPrompt: 'Tu veux recommencer ?'
    })
}