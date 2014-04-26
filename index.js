var Transform = require('stream').Transform
var util = require('util')

function Logger(opts) {
  opts = opts || {}

  if (typeof opts.objectMode === 'undefined') {
    opts.objectMode = true
  }

  this.logger = opts.logger
  this.level = opts.level || 'info'

  this.log = this.logger && this.logger[this.level]

  Transform.call(this, opts)
}

util.inherits(Logger, Transform)

Logger.prototype._transform = function transform(chunk, encoding, done) {
  if (this.log) {
    var data = chunk
    if(Buffer.isBuffer(data)){
      data = chunk.toString()
    }

    var json = null
    if(json = canStringify(data)){
      data = json
    }

    this.log(data)
  }

  this.push(chunk)
  done()
}

function canStringify(str){
  try{
    str = JSON.parse(str)
  } catch(e) {
    str = null
  }
  return str
}

module.exports = Logger
