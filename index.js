app = require('express')();
http = require('http').Server(app);
io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.set('views', __dirname + './views');

let room = 'room';

app.get('/', (req, res) => {
	res.render('chatPage');
});

io.on('connection', (socket) => {
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('leaveRoom', (name) => {
		socket.leave(room, () => {});
		console.log(name + ' has left the ' + room);
		io.to(room).emit('leaveRoom', name);
	});

	socket.on('joinRoom', (name) => {
		socket.join(room, () => {});
		console.log(name + ' has joined the ' + room);
		io.to(room).emit('joinRoom', name);
	});

	socket.on('chat message', (name, msg) => {
		io.to(room).emit('chat message', name, msg);
	});
});

http.listen(3000, () => {
	console.log('Connect at 3000');
});