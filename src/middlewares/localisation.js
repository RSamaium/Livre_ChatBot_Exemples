module.exports = (bot) => {
    bot.use({
        botbuilder(session, next) {
            const { source, sourceEvent } = session.message
            if (source === 'facebook') {
                const { attachments } = sourceEvent.message
                if (!attachments) {
                    return next()
                }
                const [{ url, payload, title, type }] = attachments
                if (type === 'location') {
                    session.beginDialog('localisationSent', { 
                        url, 
                        coordinates: payload.coordinates 
                    })
                }
            }
            else {
                next()
            }
        }
    })
}