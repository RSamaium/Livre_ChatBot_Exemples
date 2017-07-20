const builder = require('botbuilder')

module.exports = (bot) => {

    bot.dialog('askUserName', [
        (session, args, next) => {
            const { username } = session.userData
            if (!username) {
                builder.Prompts.text(session, 'Quel est ton nom ?')
                return
            }
            next()
        },
        (session, args) => {
            if (args.response) {
                session.userData.username = args.response
            }
            session.endDialog('Salut %(username)s', session.userData)
        }
    ]).triggerAction({ matches: /name/i })


    bot.dialog('dataParent', [
        (session, args, next) => {
            session.dialogData.text = 'parent'
            session.conversationData.text = 'parent'
            session.beginDialog('dataChild')
        }
    ]).triggerAction({ matches: /data/i })

    bot.dialog('dataChild', [
        (session, args, next) => {
            session.send('DialogData %s', session.dialogData.text)
            session.send('ConversationData %s', session.conversationData.text)
            session.dialogData.text = 'enfant'
            next()
        },
        (session, args) => {
            console.log('-----')
            session.endDialog('DialogData %s', session.dialogData.text)
        }
    ])
}