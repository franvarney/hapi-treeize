'use strict'

const Code = require('code')
const Lab = require('lab')
const Sinon = require('sinon')
const Treeize = require('treeize')

const Data = require('../example/data')
const Data2 = require('../example/data2')
const Data4 = require('../example/data4')
const Decorate = require('../lib/decorate')
const Output = require('./output')
const Output2 = require('./output2')

let lab = exports.lab = Lab.script()
let afterEach = lab.afterEach
let before = lab.before
let beforeEach = lab.beforeEach
let describe = lab.describe
let it = lab.it
let expect = Code.expect

let spy
let tree = Sinon.createStubInstance(Treeize)
let fn = {
  response: (data) => data
}

describe('lib/decorate', () => {
  beforeEach((done) => {
    spy = Sinon.spy(Decorate, 'reply')
    done()
  })

  afterEach((done) => {
    Decorate.reply.restore()
    return done()
  })

  describe('decorates reply with treeize', () => {
    describe('when no options are passed in through reply', () => {
      before((done) => {
        tree.getData.returns(Output)
        return done()
      })

      it('uses the default options', (done) => {
        Decorate.reply.call(fn, {}, Data, null)
        expect(spy.getCall(0).args[0]).to.deep.equal({})
        expect(spy.returnValues[0].length).to.equal(2)
        return done()
      })
    })

    describe('when options are passed in through reply', () => {
      let newOptions = {
        input: {
          uniformRows: false
        },
        output: {
          resultsAsObject: true
        }
      }

      before((done) => {
        tree.getData.returns(Output2)
        return done()
      })

      it('overrides the default options', (done) => {
        Decorate.reply.call(fn, null, Data2, newOptions, null)
        expect(typeof spy.returnValues[0]).to.equal('object')
        return done()
      })
    })

    describe('when a signature is passed in', () => {
      before((done) => {
        tree.getData.returns([{ id: 1, value: 'test' }, { id: 2, value: 'test2' }])
        done()
      })

      it('sets the signature', (done) => {
        Decorate.reply.call(fn, null, Data4, null, ['id', 'value'])
        expect(spy.returnValues[0][1]).to.deep.equal({ id: 2, value: 'test2' })
        return done()
      })
    })

    describe('when replying with data', () => {
      before((done) => {
        tree.getData.returns(Output)
        return done()
      })

      it('returns the data in object format', (done) => {
        Decorate.reply.call(fn, {}, Data)
        expect(spy.returnValues[0][1].name).to.equal('Mary Jane')
        return done()
      })
    })
  })
})
