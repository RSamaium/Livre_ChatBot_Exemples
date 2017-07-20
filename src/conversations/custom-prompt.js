const builder = require('botbuilder')
const validator = require('validator')

module.exports = (bot) => {

    bot.dialog('askEmail', [
        (session) => {
            session.beginDialog('promptEmail', {
                prompt: 'Donne-moi ton adresse email !',
                retryPrompt: 'Hmm, incorrect. Recommence !'
            })
        },
        (session, args) => {
            const { response } = args
            if (!response) {
                session.endDialog('Vous me donnerez votre adresse une autre fois !')
                return
            }
            session.endDialog('Votre email %s', response)
        }
    ]).triggerAction({
        matches: /email/i
    })

    const prompt = new builder.IntentDialog()
        .onBegin((session, args = {}) => {
            session.dialogData.retryPrompt = args.retryPrompt
            session.dialogData.prompt = args.prompt
            session.send(args.prompt || 'Quel est votre adresse email ?')
        })
        .matches(/stop/i, (session) => {
            session.endDialogWithResult({ response: null })
        })
        .onDefault((session) => {
            const { text } = session.message
            const { retryPrompt } = session.dialogData
            if (validator.isEmail(text)) {
                session.endDialogWithResult({ response: text })
                return
            }
            session.send(retryPrompt || 'Ce n\'est pas une adresse email, réessayez')
            session.replaceDialog('promptEmail', session.dialogData)
        })

    bot.dialog('promptEmail', prompt)
}