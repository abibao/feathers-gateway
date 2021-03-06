'use strict'

// load configurations
const nconf = require('nconf')
nconf.argv().env().file({ file: 'nconf-deve.json' })

// rethinkdb connector
const r = require('rethinkdbdash')({
  silent: true,
  host: nconf.get('ABIBAO_ANALYTICS_GATEWAY_SERVER_RETHINK_HOST'),
  port: nconf.get('ABIBAO_ANALYTICS_GATEWAY_SERVER_RETHINK_PORT'),
  authKey: nconf.get('ABIBAO_ANALYTICS_GATEWAY_SERVER_RETHINK_AUTH_KEY'),
  db: nconf.get('ABIBAO_ANALYTICS_GATEWAY_SERVER_RETHINK_DB')
})
const Service = require('feathers-rethinkdb').Service

module.exports.r = r
module.exports.Service = Service
