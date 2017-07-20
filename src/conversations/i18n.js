const builder = require('botbuilder')
const _ = require('lodash')

module.exports = (bot) => {

    let languages = {
        'fr': 'Français',
        'en': 'English'
    }

    languages = _.merge(languages, _.invert(languages))

    bot.dialog('i18n', [
        (session) => {
            const currentLanguage = session.preferredLocale()
            session.send('current_language', languages[currentLanguage])
            builder.Prompts.choice(session, 'ask_language', 'Français|English')
        },
        (session, args) => {
            const { entity } = args.response
            const locale = languages[entity]
            session.preferredLocale(locale, (err) => {
                if (!err) {
                    session.endDialog('new_language', entity)
                } else {
                    session.error(err)
                }
            })
        }
    ]).triggerAction({ matches: /locale/i })

    bot.dialog('error', (session) => {
        session.error(new Error('erreur'))
    }).triggerAction({ matches: /error/i })
}