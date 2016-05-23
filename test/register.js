'use strict'

const Code = require('code')
const Hapi = require('hapi')
const Lab = require('lab')
const Sinon = require('sinon')

const Decorate = require('../lib/decorate')
const HapiTreeize = require('../lib/register')

let lab = exports.lab = Lab.script()
let before = lab.before
let describe = lab.describe
let it = lab.it
let expect = Code.expect

let server = Sinon.createStubInstance(Hapi.Server)

describe('lib/register', () => {
  describe('when registering the plugin', () => {
    before((done) => {
      server.decorate.returns(Decorate.reply)
      done()
    })

    it('decorates reply', (done) => {
      HapiTreeize.register(server, {}, (err) => {
        expect(err).to.be.undefined()
        expect(server.decorate.called).to.be.true()
        expect(server.decorate.returned(Decorate.reply)).to.be.true()
        done()
      })
    })
  })
})
