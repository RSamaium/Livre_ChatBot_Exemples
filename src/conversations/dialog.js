module.exports = (bot) => {
    bot.dialog('greeting', [
        (session, args, next) => {
            session.send('Bonjour')
            next()
        },
        (session, args, next) => {
            session.send('Comment vas-tu ?')
            session.endDialogWithResult({ response: 'discuter' })
        }
    ])
    bot.dialog('presentation', [
        (session, args, next) => {
            console.log(session.message)
            session.send('Je suis ChatBot !')
            session.beginDialog('greeting')
        },
        (session, args, next) => {
            session.send('Mon but est juste de %s', args.response)
        }
    ]).triggerAction({ matches: /ya/i })
}