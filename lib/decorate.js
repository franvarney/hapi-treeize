'use strict'

const Asset = require('assert')
const Treeize = require('treeize')

exports.reply = function (defaults, data, options, signature) {
  Asset.notEqual(data === null || data === undefined, true, 'Invalid data to treeize')

  if (!Array.isArray(data) && options.singleResult === true) {
    data = [data] // allows a single object to be treeized
  }

  let tree = new Treeize()

  if (options) tree.options(options)
  else {
    tree.options(defaults)
    options = {}
  }

  if (signature) tree.setSignature(signature)

  tree.grow(data)
  let output = tree.getData()

  if (data.length === 1 && options.singleResult === true) {
    output = output[0] // returns a single object from a treeized array
  }

  return this.response(output)
}
