'use strict'

const Treeize = require('treeize')

exports.reply = function (defaults, data, options, signature) {
  let tree = new Treeize()

  if (options) tree.options(options)
  else tree.options(defaults)

  if (signature) tree.setSignature(signature)

  tree.grow(data)
  let output = tree.getData()

  return this.response(output)
}
