const http = require('http');
const fs = require('fs');
const app = http.createServer(handler);

let PORT = 3333;

let index = fs.readFileSync('./index.html');

function handler(req, res) {
	res.writeHead(200);
	res.end(index);
}

app.listen(PORT, () => {
	console.log('Server successfully started');

	let io = require('socket.io').listen(app);

	io.on('connection', (socket) => {

		console.log(socket.id +' connected');
		
		socket.on('request', (callback) => {
			console.log('pong');
			callback('pong');
		});

	});

});