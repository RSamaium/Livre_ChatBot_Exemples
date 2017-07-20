const builder = require('botbuilder')
const config = require('../config')

module.exports = (bot) => {
    bot.dialog('card', (session) => {
        const msg = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .title('JavaScript !')
                    .text('JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs avec l\'utilisation (par exemple) de Node.JS.')
                    .images([
                        builder.CardImage
                            .create(session, `${config.url}/public/images/js-icon.png`)
                            .alt('Logo Javascript')
                            .tap(builder.CardAction.openUrl(session, 'https://fr.wikipedia.org/wiki/JavaScript'))
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://fr.wikipedia.org/wiki/JavaScript', 'Voir le site'),
                        builder.CardAction.dialogAction(session, 'cardDetailAction', 'wikipedia', 'Plus de détails')
                    ])
            ])
        session.endDialog(msg)
    }).triggerAction({ matches: /article/i })

    bot.beginDialogAction('cardDetailAction', 'cardDetail')

    bot.dialog('cardDetail', (session, args) => {
        const article = args.data
        session.endDialog('Quelques détails de l\'article %s', article)
    }).triggerAction({ matches: /détails/i })

    bot.dialog('cardThumb', (session, args) => {
        const msg = new builder.Message(session)
            .attachments([
                new builder.ThumbnailCard(session)
                    .title('JavaScript !')
                    .subtitle('Définition')
                    .text('JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs avec l\'utilisation (par exemple) de Node.JS.')
                    .images([
                        builder.CardImage.create(session, `${config.url}/public/images/js-icon.png`)
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://fr.wikipedia.org/wiki/JavaScript', 'Voir le site')
                    ])
            ])
        session.endDialog(msg)
    }).triggerAction({ matches: /vignette/i })

    bot.dialog('cardAnimation', (session, args) => {
        const msg = new builder.Message(session)
            .attachments([
                new builder.AnimationCard(session)
                    .title('JavaScript !')
                    .subtitle('Définition')
                    .text('JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs avec l\'utilisation (par exemple) de Node.JS.')
                    .media([
                        { url: 'https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif' }
                    ])
                    .shareable(false)
            ])
        session.endDialog(msg)
    }).triggerAction({ matches: /animation/i })

    bot.dialog('cardVideo', (session, args) => {
        const msg = new builder.Message(session)
            .attachments([
                new builder.VideoCard(session)
                    .title('Big Bug Bunny')
                    .subtitle('Une vidéo hilarante !')
                    .media([
                        { url: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4' }
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://peach.blender.org', 'Voir le site')
                    ])
                    .autostart(true)
            ])
        session.endDialog(msg)
    }).triggerAction({ matches: /video/i })

    bot.dialog('cardAudio', (session, args) => {
        const msg = new builder.Message(session)
            .attachments([
                new builder.AudioCard(session)
                    .title('Go !')
                    .subtitle('"Go" sound')
                    .media([
                        { url: `${config.url}/public/sounds/go.ogg` }
                    ])
            ])
        session.endDialog(msg)
    }).triggerAction({ matches: /audio/i })

    bot.dialog('cardReceipt', (session, args) => {
        const msg = new builder.Message(session)
            .attachments([
                new builder.ReceiptCard(session)
                    .title('Repas chez MyRestoExample')
                    .facts([
                        builder.Fact.create(session, '1337', 'Commande'),
                        builder.Fact.create(session, 'VISA 5555-****', 'Paiement')
                    ])
                    .items([
                        builder.ReceiptItem.create(session, '15 €', 'Repas')
                            .quantity(1)
                            .image(builder.CardImage.create(session, `${config.url}/public/images/item_1.png`)),
                        builder.ReceiptItem.create(session, '5 €', '2x Bouteilles de vin')
                            .quantity(2)
                            .image(builder.CardImage.create(session, `${config.url}/public/images/item_2.png`))
                    ])
                    .tax('5,5 %')
                    .total('26,38 €')
                    .buttons([
                        builder.CardAction.openUrl(session, 'http://myrestoexample.com', 'Plus d\'informations')
                    ])
            ])
        session.endDialog(msg)
    }).triggerAction({ matches: /facture/i })


    bot.dialog('cardLogin', (session, args) => {
        const msg = new builder.Message(session)
            .attachments([
                new builder.SigninCard(session)
                    .text('Connectez-vous à votre compte')
                    .button("Connexion", 'http://login.example.com')
            ])
        session.endDialog(msg)
    }).triggerAction({ matches: /login/i })

    bot.dialog('cardPizza', (session, args) => {
        const msg = new builder.Message(session)
            .addAttachment({
                contentType: "application/vnd.microsoft.card.adaptive",
                content: {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "0.5",
                    "body": [
                        {
                            "speak": "<s>Tom's Pie is a Pizza restaurant which is rated 9.3 by customers.</s>",
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "size": 2,
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Tom's Pie",
                                            "weight": "bolder",
                                            "size": "extraLarge"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "9.3 · $$ · Pizza",
                                            "isSubtle": true
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "The BEST artisan pizza in Seattle!",
                                            "wrap": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "size": 1,
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "http://res.cloudinary.com/sagacity/image/upload/c_crop,h_670,w_635,x_0,y_0/c_scale,w_640/v1397425743/Untitled-4_lviznp.jpg",
                                            "size": "auto"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "actions": [
                        {
                            "type": "Action.OpenUrl",
                            "title": "More Info",
                            "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        }
                    ]
                }
            })
        session.endDialog(msg)
    }).triggerAction({ matches: /pizza/i })

    bot.dialog('cardSlider', (session) => {
        console.log()
        const msg = new builder.Message(session)
            .attachmentLayout('carousel')
            .attachments([
                new builder.HeroCard(session)
                    .title('JavaScript !')
                    .text('JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs avec l\'utilisation (par exemple) de Node.JS.')
                    .images([
                        builder.CardImage
                            .create(session, `${config.url}/public/images/js-icon.png`)
                            .alt('Logo Javascript')
                            .tap(builder.CardAction.openUrl(session, 'https://fr.wikipedia.org/wiki/JavaScript'))
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://fr.wikipedia.org/wiki/JavaScript', 'Voir le site')
                    ]),
                new builder.HeroCard(session)
                    .title('NodeJS !')
                    .text('Node.js est une plateforme logicielle libre et événementielle en JavaScript orientée vers les applications réseau qui doivent pouvoir monter en charge.')
                    .images([
                        builder.CardImage
                            .create(session, `${config.url}/public/images/nodejs.png`)
                            .alt('Logo NodeJS')
                            .tap(builder.CardAction.openUrl(session, 'https://fr.wikipedia.org/wiki/Node.js'))
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://fr.wikipedia.org/wiki/Node.js', 'Voir le site')
                    ])
            ])
        session.endDialog(msg)
    }).triggerAction({ matches: /slider/i })

}