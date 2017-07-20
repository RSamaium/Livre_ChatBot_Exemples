const builder = require('botbuilder')

module.exports = (bot) => {

    /*bot.recognizer({
        recognize(context, done) {
            const { text } = context.message
            let intent = { score: 0.0 }
            if (text) {
                switch (text.toLowerCase()) {
                    case 'au revoir':
                        intent = { score: 1.0, intent: 'GoodbyeIntent' }
                        break
                }
            }
            done(null, intent)
        }
    })
    */


    bot.recognizer(
        new builder.RegExpRecognizer('GoodbyeFakeIntent', {
            en_us: /^(bye)/i,
            fr: /^au revoir$/
        }).onFilter((context, result, done) => {
            if (result.intent === 'GoodbyeFakeIntent') {
                done(null, { score: 1.0, intent: 'GoodbyeIntent' })
                return
            } 
            done(null, result)
        })
    )

    bot.dialog('goodbye', (session, args) => {
        session.endDialog('Au revoir !')
    }).triggerAction({ matches: 'GoodbyeIntent' })

}