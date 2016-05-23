hapi-treeize
============
A hapi.js plugin that decorates reply with [Treeize](https://www.npmjs.com/package/treeize) functionality. Requires Node v4+.

## Install
`npm install hapi-treeize`

## Info
`reply.treeize` accepts three parameters:

1. *required* - the data to be treeized
2. _optional_ - route specific Treeize options (otherwise uses the defaults you set in `server.register` OR Treeize defaults if you don't specify any)
3. _optional_ - a signature for the data

See the [Treeize](https://www.npmjs.com/package/treeize) documentation for more information on the options and signature.

## Usage
```
const {Server} = require('hapi')
const HapiTreeize = require('hapi-treeize')

const server = new Server()
server.connection({ port: 8080 })

server.register({
  register: HapiTreeize,
  options: {} // optional, see Treeize docs
}, (err) => {
  if (err) throw err
})

server.route([
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.treeize({ value: 'data' })
  }
}

server.start((err) => {
  if (err) throw err
})
```

See more examples in the examples directory.

## Tests
`npm test`
