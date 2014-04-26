# Logger Stream

A package to help dump information passing through streams into Bunyan

# Installation

`npm install logger-stream`

# Usage

```javascript
var bunyan = require('bunyan')
var log = bunyan.createLogger({name: 'mylogger'})

var LoggerStream = require('LoggerStream')
var loggerStream= new LoggerStream({ logger: log })

stdin.pipe(loggerStream)
```
