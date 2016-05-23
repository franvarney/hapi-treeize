'use strict'

const Code = require('code')
const Hapi = require('hapi')
const Lab = require('lab')

const HapiTreeize = require('../lib/register')

let lab = exports.lab = Lab.script()
let describe = lab.describe
let it = lab.it
let expect = Code.expect

describe('lib/register', () => {
  describe('when registering the plugin', () => {
    it('decorates reply', (done) => {
      let server = new Hapi.Server()
      server.connection()

      server.register(HapiTreeize, (err) => {
        expect(err).to.be.undefined()
      })

      server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => reply.treeize([[1, true]], null, ['id', 'value'])
      })

      server.inject({
        method: 'GET',
        url: '/'
      }, (response) => {
        expect(response.result).to.deep.equal([{ id: 1, value: true }])
        done()
      })
    })
  })
})
