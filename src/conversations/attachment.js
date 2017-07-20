const fs = require('fs')
const path = require('path')
const builder = require('botbuilder')
const util = require('util')
const _ = require('lodash')
const rp = require('request-promise')
const config = require('../config')

module.exports = (bot, connector) => {

    function getAccessToken() {
        return new Promise((resolve, reject) => {
            connector.getAccessToken((err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    }

    bot.dialog('attachment', async (session) => {
        const { attachments, source } = session.message
        const { contentType, contentUrl } = attachments[0]
        if (!/image/.test(contentType)) {
            return session.send('Envoie-moi plutôt une image !')
        }
        session.send('Très belle image')
        // Enregistrer la photo
        try {
            const options = {
                url: contentUrl,
                encoding: 'binary'
            }
            if (source === 'skype' || source === 'msteams') {
                options.headers = {
                 'Authorization': 'Bearer ' + await getAccessToken()
                }
            }
            const imageContent = await rp(options)
            const imageName = _.uniqueId('photo-') + '.' + _.last(contentType.split('/'))
            fs.writeFile(`${config.publicPath}/images/${imageName}`, imageContent, 'binary', (err) => {
                if (err) throw err
                session.endDialog('L\'image a bien été sauvegardée !')
            })
        }
        catch (err) {
            return session.error(err)
        }
        // ---
    })

    bot.dialog('sendAttachment', (session) => {
        const msg = new builder.Message(session)
            .addAttachment({
                contentUrl: `${config.publicPath}/images/photo.jpg`,
                contentType: 'image/jpeg',
                name: 'photo.jpg'
            })
        session.endDialog(msg)
    }).triggerAction({ matches: /photo/i })

    bot.dialog('sendPrivateAttachment', (session) => {
        fs.readFile(path.join(__dirname, '../server/private/photo2.jpg'), function (err, data) {

            if (err) {
                return session.endDialog('Impossible de lire la photo :(');
            }

            const base64 = Buffer.from(data).toString('base64')
            const contentType = 'image/jpeg'

            const msg = new builder.Message(session)
                .addAttachment({
                    contentUrl: `data:${contentType};base64,${base64}`,
                    contentType,
                    name: 'photo.jpg'
                });

            session.endDialog(msg)
        })
    }).triggerAction({ matches: /photo privée/i })
}