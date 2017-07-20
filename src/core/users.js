class Users {
    constructor() {
        this.collection = new Map()
    }
    assignBot(bot) {
        this.bot = bot
    }
    saveAddress(address) {
        this.collection.set(address.user.id, address)
    }
    send(userId, text, done) {
        if (!this.collection.has(userId)) {
            const err = new Error('User Id n\'existe pas')
            err.status = 404
            return done(err)
        }
        const address = this.collection.get(userId)
        /*this.bot.send({
            type: 'message',
            text,
            address
        }, done)
        */ 
        this.bot.beginDialog(address, 'notification', { text }, done)
    }
    broadcast(dialogId, args) {
        this.collection.forEach(address => this.bot.beginDialog(address, dialogId, args))
    }
}

module.exports = new Users()