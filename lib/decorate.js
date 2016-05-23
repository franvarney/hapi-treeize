'use strict'

const Asset = require('assert')
const Treeize = require('treeize')

exports.reply = function (defaults, data, options, signature) {
  Asset.notEqual(data === null || data === undefined, true, 'Invalid data to treeize')

  let tree = new Treeize()

  if (options) tree.options(options)
  else tree.options(defaults)

  if (signature) tree.setSignature(signature)

  tree.grow(data)
  let output = tree.getData()

  return this.response(output)
}
