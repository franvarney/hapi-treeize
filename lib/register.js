'use strict'

const Decorate = require('./decorate')
const Package = require('../package')

exports.register = function (server, defaults, next) {
  server.decorate('reply', 'treeize', function (data, options, signature) {
    return Decorate.reply.apply(this, [defaults, data, options, signature])
  })

  return next()
}

exports.register.attributes = {
  pkg: Package
}
