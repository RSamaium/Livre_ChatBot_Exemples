module.exports = (bot) => {
    bot.dialog('library', (session, args) => {
        session.beginDialog('askNameLibrary:name')
    }).triggerAction({ matches: /name/i })
}