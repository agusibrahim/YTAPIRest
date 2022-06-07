const express = require('express')
const logger = require('pino')()
var cors = require('cors')
const error = require('./src/api/middlewares/error')
const exceptionHandler = require('express-exception-handler')
exceptionHandler.handle()

const app = express();
app.use(cors())
const routes = require('./src/api/routes/')
app.use(express.json())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

const myLogger = function (req, res, next) {
  const oldJson = res.json;
  res.json = (body) => {
    if("metadata" in body)
      delete body.metadata["available_countries"]
    if("data" in body && "responseContext" in body.data && "translated_content" in body)
      delete body['data']
    delete body['status_code']
    return oldJson.call(res, "error" in body && "code" in body ? body : { error: false, code: 200, data: body });
  };
  next()
}
app.use(myLogger)
app.use('/', routes)
app.use(error.handler)

let server = app.listen(3061, () => {
  logger.info(`Listening to port 3061`)
})
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})