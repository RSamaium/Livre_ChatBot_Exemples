const express = require('express')
const rp = require('request-promise')
const path = require('path')
const config = require('../config')
const users = require('../core/users')
const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/api/notification', (req, res, next) => {
  users.broadcast('notification', { text: 'Une notification pour tout le monde !' })
  res.status(204).end()
})

app.get('/api/notification/:userId', (req, res, next) => {
  const { userId } = req.params
  const ret = users.send(userId, 'Voici une nouvelle notification :)', (err) => {
    if (err) return next(err)
    res.status(204).end()
  })
})

app.get('/api/user/:psid', async (req, res, next) => {
  const { psid } = req.params
  const uri = `https://graph.facebook.com/v2.6/${psid}?access_token=${config.platforms.facebook.token}`
  try {
    const data = await rp({ uri, json: true })
    res.json(data)
  }
  catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message
  })
})

module.exports = app