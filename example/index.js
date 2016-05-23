'use strict'

const Hapi = require('hapi')

const Data = require('./data')
const Data2 = require('./data2')
const Data3 = require('./data3')
const Data4 = require('./data4')
const HapiTreeize = require('../lib/register')

let server = new Hapi.Server()

server.connection({ port: 8080 })

let treeizeOptions = {
  input: {
    uniformRows: true
  },
  output: {
    resultsAsObject: false
  }
}

let newOptions = {
  input: {
    uniformRows: false
  },
  output: {
    resultsAsObject: true
  }
}

server.register({
  register: HapiTreeize,
  options: treeizeOptions
}, (err) => {
  if (err) throw err
})

server.route([
  {
    method: 'GET',
    path: '/defaults',
    handler: (request, reply) => reply.treeize(Data)
  },
  {
    method: 'GET',
    path: '/override',
    handler: (request, reply) => reply.treeize(Data2, newOptions)
  },
  {
    method: 'GET',
    path: '/birds',
    handler: (request, reply) => reply.treeize(Data3)
  },
  {
    method: 'GET',
    path: '/signature',
    handler: (request, reply) => reply.treeize(Data4, null, ['id', 'value'])
  }
])

server.start((err) => {
  if (err) throw err
  console.log(`Server started at ${server.info.uri}`)
})
