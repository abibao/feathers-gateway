'use strict'

// load configurations
const nconf = require('nconf')
nconf.argv().env().file({ file: 'nconf-deve.json' })

// externals libraries
const _ = require('lodash')

// feathers libraries
const hooks = require('feathers-hooks');

// internals libraries
const Rethinkdb = require('./../contructors/services/rethinkdb')

const TABLE_NAME = 'surveys'

// constructor class
class Service extends Rethinkdb.Service {
  setup (app) {
    app.service(TABLE_NAME).after(hooks.populate('campaign', {
      service: 'campaigns',
      field: 'campaign'  
    }))
    app.service(TABLE_NAME).after(hooks.populate('individual', {
      service: 'individuals',
      field: 'individual'  
    }))
    app.service(TABLE_NAME).after({
      all: hooks.remove('id')
    })
  }
}

// exports
module.exports = new Service({
  Model: Rethinkdb.r,
  name: TABLE_NAME
})