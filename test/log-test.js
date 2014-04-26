var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var LoggerStream = require('../index.js')
var outputSpy = null
var logger = null
var loggerStream

describe('Log test', function(){
  beforeEach(function(){
    outputSpy = sinon.spy()
    logger = {
      info: outputSpy
    }
  })

  describe('defaults', function(){
    beforeEach(function(){
      loggerStream = new LoggerStream({
        objectMode: true,
        logger: logger
      })
    })

    it('sets the logger level to info', function(){
      expect(loggerStream.level).to.eql('info')
    })
  })

  describe('in objectMode', function(){
    beforeEach(function(){
      loggerStream = new LoggerStream({
        objectMode: true,
        logger: logger,
        level: 'info'
      })
    })

    it('logs a string piped to it', function(){
      var testStr = 'test string'
      loggerStream.write(testStr)
      expect(outputSpy).to.have.been.called
      expect(outputSpy).to.have.been.calledWith(testStr)
    })

    it('logs an object piped to it', function(){
      var testObj = { test: 'object' }
      loggerStream.write(testObj)
      expect(outputSpy).to.have.been.called
      expect(outputSpy).to.have.been.calledWith(testObj)
    })

    it('logs objects passed as strings', function(){
      var testObj = { test: 'object' }

      loggerStream.write(JSON.stringify(testObj))

      expect(outputSpy).to.have.been.called
      expect(outputSpy).to.have.been.calledWith(testObj)
    })

    it('outputs the input', function(done){
      var testObj = { test: 'object' }

      loggerStream.on('data', function(chunk){
        expect(testObj).to.eql(chunk)
        done()
      })

      loggerStream.write(testObj)
      expect(outputSpy).to.have.been.called
      expect(outputSpy).to.have.been.calledWith(testObj)
    })
  })
})
