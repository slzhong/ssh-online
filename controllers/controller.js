var spawn = require('child_process').spawn

var IO
  , stat = 0 // 0: not logged in, 1: logged in

function socketHandler (socket) {
  socket.on('login', function (data) {
    login(data.host, data.password)
  })
}

function login (host, password) {
  var process = spawn('ssh', ['-tt', host]).on('error', function (err) {
    console.log(err)
  })
  process.stdout.on('data', function (data) {
    if (stat == 0) {
      process.stdin.end(password)
      stat = 1
    }
    // console.log(data)
  })
  process.stderr.on('data', function (data) {
    // console.log(data.toString('utf-8', 0, data.length))
  })
  process.on('close', function (code) {
    
  })
}

function decode (data) {
  var dataView = new DataView(data)
  var decoder = new TextDecoder('utf-8')
  var decodedString = decoder.decode(dataView)
  console.log(decodedString)
}

exports.init = function (io) {
  IO = io
  IO.on('connection', socketHandler)
}