const builder = require('botbuilder')

module.exports = (bot) => {

        bot.dialog('suggestion', [
            (session, args, next) => {
                const { text } = session.message
                if (/<[0-9]>/.test(text)) {
                    session.dialogData.action = text
                    return next()
                }
                const msg = new builder.Message(session)
                    .text('Avez-vous aimé la vidéo ?')
                    .suggestedActions(builder.SuggestedActions.create(session, [
                        builder.CardAction.postBack(session, '<1>', 'oui'),
                        builder.CardAction.postBack(session, '<2>', 'mouais'),
                        builder.CardAction.postBack(session, '<3>', 'non')
                    ]))
                session.send(msg)
            },
            (session, args) => {
                const { action } = session.dialogData
                switch (action) {
                    case '<1>':
                        session.endDialog('Super !')
                        break
                    case '<2>':
                        session.endDialog('Ok, on verra commet mieux faire !')
                        break
                    case '<3>':
                        session.endDialog('Mince ...')
                }
    
            }
        ]).triggerAction({ matches: /suggestion/i })

    bot.dialog('suggestion2', [
        (session, args, next) => {
            if (args.data) {
                session.dialogData.action = args.data
                return next()
            }
            const msg = new builder.Message(session)
                .text('Avez-vous aimé la vidéo ? :)')
                .suggestedActions(builder.SuggestedActions.create(session, [
                    builder.CardAction.dialogAction(session, 'suggestionAction', '<1>', 'oui'),
                    builder.CardAction.dialogAction(session, 'suggestionAction', '<2>', 'mouais'),
                    builder.CardAction.dialogAction(session, 'suggestionAction', '<3>', 'non')
                ]))
            session.endDialog(msg)
        },
        (session, args) => {
            const { action } = session.dialogData
            switch (action) {
                case '<1>':
                    session.endDialog('Super !')
                    break
                case '<2>':
                    session.endDialog('Ok, on verra commet mieux faire !')
                    break;
                case '<3>':
                    session.endDialog('Mince ...')
            }

        }
    ]).triggerAction({ matches: /suggestion2/i })

    bot.beginDialogAction('suggestionAction', 'suggestion2')
}