const builder = require('botbuilder')

const lib = new builder.Library('askNameLibrary')

lib.dialog('name', [
    (session) => {
        builder.Prompts.text(session, 'Quel est ton nom ?')
    },
    (session, args) => {
        const { response } = args
        session.send('Merci %s', response)
    }
])

module.exports = lib