const builder = require('botbuilder')

module.exports = (bot) => {

    /* bot.dialog('prompt', [
         (session, args) => {
             session.send('Je suis Chatbot')
             builder.Prompts.text(session, 'et toi, quel est ton nom ?')
         },
         (session, args) => {
             session.send('Salut %s !', args.response)
             builder.Prompts.number(session, 'Et quel est ton age ?')
         },
         (session, args) => {
             let msg = args.response < 18 ? 'Ho, tu es jeune !' : 'Merci !'
             session.endDialog(msg)
         }
     ]).triggerAction({ matches: /nom/i }) */

    const languages = {
        'Français': 'fr',
        'Anglais': 'en',
        'Espagnol': 'es'
    }

    bot.dialog('promptLanguage', [
        (session, args) => {
            // ou builder.Prompts.choice(session, 'Choisis une langue', ['Français', 'Anglais', 'Espagnol'])
            /*builder.Prompts.choice(session, 'Choisis une langue', 'Français|Anglais|Espagnol', {
                listStyle: 'button'
            })*/
            builder.Prompts.choice(session, 'Choisis une langue', languages)
        },
        (session, args) => {
            const { response } = args
            const language = response.entity
            const languageId = languages[language]
            session.send('Identifiant de %s est "%s" !', language, languageId)
        }
    ]).triggerAction({ matches: /langue/i })

    bot.dialog('promptConfirm', [
        (session, args) => {
            builder.Prompts.confirm(session, 'Etes-vous sûr de vouloir supprimer votre compte ?');
        },
        (session, args) => {
            if (args.response) {
                session.endDialog('C\'est triste :(')
            }
            else {
                session.endDialog('Heureusement !')
            }
        }
    ]).triggerAction({ matches: /supprimer/i })

    bot.dialog('promptTime', [
        (session, args) => {
            builder.Prompts.time(session, 'Quand partez-vous ?')
        },
        (session, args) => {
            const date = builder.EntityRecognizer.resolveTime([args.response])
            console.log(args.response)
            session.endDialog('C\'est noté, vous partez le %s', date)
        }
    ]).triggerAction({ matches: /partir/i })

    bot.dialog('promptAttachment', [
        (session, args) => {
            builder.Prompts.attachment(session, 'Envoyez-moi la pièce jointe !')
        },
        (session, args) => {
            const { name, contentType, contentUrl } = args.response[0]
            if (!/image/.test(contentType)) {
                session.endDialog('Je veux une image !')
                return
            }
            session.endDialog('Merci, je vais publier la photo !')
        }
    ]).triggerAction({ matches: /publier photo/i })

    /*bot.dialog('prompt', [
        (session, args) => {
            session.beginDialog('askName')
        },
        (session, args) => {
            if (!args.response) {
                switch (builder.ResumeReason[args.resumed]) {
                    case 'canceled':
                        session.cancelDialog()
                        break
                    case 'forward':
                        session.send('Ok, passons à la prochaine question !')
                        break
                }
                return
            }
            session.endDialog('Salut %s !', args.response)
        }
    ]).triggerAction({ matches: /nom/i })
    */

    bot.dialog('askName', [
        (session, args) => {
            session.send('Je suis Chatbot')
            builder.Prompts.text(session, 'et toi, quel est ton nom ?')
        },
        (session, args) => {
            const { response } = args
            if (/^suite$/i.test(response)) {
                session.endDialogWithResult({
                    response: null,
                    resumed: builder.ResumeReason.forward
                })
                return
            }
            session.endDialogWithResult(args)
        }
    ]).cancelAction('cancel', 'Ok, je suis trop indiscret ;)', {
        matches: /^annuler$/i
    })


}