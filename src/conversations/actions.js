const builder = require('botbuilder')

module.exports = (bot) => {

    bot.dialog('actionDialog', [
        (session, args) => {
            builder.Prompts.text(session, 'Vous réalisez une action ?')
        },
        (session) => {
            session.endDialog('ok')
        }
    ]).triggerAction({
        matches: /action/i,
        confirmPrompt: 'On arrête cette conversation ?'
    }).cancelAction('actionCancel', 'Action annulée', {
        matches: /^annuler/i,
        confirmPrompt: 'Etes vous sûr de vouloir annuler ?'
    }).beginDialogAction('actionDialogAction', 'helpActionDialog', { matches: /^help$/i })

    bot.dialog('saveDialog', [
        (session, args) => {
            builder.Prompts.text(session, 'Voulez-vous sauvegarder ?')
        },
        (session) => {
            session.endDialog('Fait !')
        }
    ]).triggerAction({
        matches: /save/i
    }).endConversationAction('endSaveConversation', 'Ok, je ne parle plus :(', {
        matches: /^stop$/i,
        confirmPrompt: 'Etes-vous sûr d\'arrêter cette conversation ?'
    }).beginDialogAction('saveDialogAction', 'helpSaveDialog', { matches: /^help$/i })

    bot.dialog('helpSaveDialog', function (session, args, next) {
        session.endDialog('Il faut toujours sauvegarder !')
    })

    bot.dialog('helpActionDialog', function (session, args, next) {
        session.endDialog('Mon aide est très médiocre...')
    })

}