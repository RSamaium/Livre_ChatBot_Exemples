const builder = require('botbuilder')
const locationDialog = require('botbuilder-location')

module.exports = (bot) => {
    bot.dialog('localisationSent', (session, args) => {
        const { url, coordinates } = args
        session.endDialog('coordonnées : %(lat)s et %(long)s', coordinates)
    })
    bot.dialog('localisation', [
        (session) => {
            locationDialog.getLocation(session, {
                prompt: 'Indiquez-moi le lieu !',
                useNativeControl: true,
                requiredFields:
                locationDialog.LocationRequiredFields.streetAddress |
                locationDialog.LocationRequiredFields.locality |
                locationDialog.LocationRequiredFields.region |
                locationDialog.LocationRequiredFields.postalCode |
                locationDialog.LocationRequiredFields.country
            })
        },
        (session, args) => {
            console.log(args)
            const { response: place } = args
            if (place) {
                session.endDialog(`Votre adresse : 
                    ${place.streetAddress}, 
                    ${place.locality},
                    ${place.region},
                    ${place.country},
                    ${place.postalCode}`)
            }
            else {
                session.endDialog('Je ne trouve pas le lieu :/');
            }
        }
    ]).triggerAction({ matches: /lieu/i })
}