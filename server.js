'use strict'
/**
 * Module dependencies
 */
// Polyfill es6 and fetch()
require("babel-polyfill")
var serve = require('koa-static')
var koa = require('koa')
var router = require('koa-router')
var logger = require('koa-logger')
var responseTime = require('koa-response-time')
var bodyParser = require('koa-bodyparser')
var cors = require('koa-cors')
var compress = require('koa-compress')
var apiserver = require('./server/apiserver')

/**
 * Environment
 */
var env = process.env.NODE_ENV || 'development'
var port = env == "development" ? 3000 : 80

/**
 * Server initialization
 */
var app = koa()

/**
 * Middlewares
 */
// Set up X-Response-Time http header, POST bodyparser and allow CORS
app.use(responseTime())
app.use(bodyParser())
app.use(cors())
app.use(logger())

/**
 * Client (Static)
 */
app.use(serve(__dirname + '/static'))

/**
 * API server
 */
var api = router()

api.post('/api', apiserver)
app
.use(api.routes())
.use(api.allowedMethods())

// Listen to port 3000
app.listen(port)
console.log(`Listening to port ${port}`)
