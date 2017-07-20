const builder = require('botbuilder')
const config = require('../config')

module.exports = (bot) => {
    bot.dialog('webview', (session) => {
        const msg = new builder.Message(session)
            .sourceEvent({
                facebook: {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'button',
                            text: 'Que souhaitez-vous faire ?',
                            buttons: [{
                                type: 'web_url',
                                url: `${config.url}/public/views/webview.html`,
                                title: 'Voir la WebView',
                                webview_height_ratio: 'tall',
                                messenger_extensions: true
                            }]
                        }
                    }
                }
            })
        session.endDialog(msg)
    }).triggerAction({ matches: /webview/i })
}