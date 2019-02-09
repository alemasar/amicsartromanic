// server.js
var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('data/api/db.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use('/', router)  // Rewrite routes to appear after /api
server.listen(3005, function () {
    console.log('JSON Server is running')
})