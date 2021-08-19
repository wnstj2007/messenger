const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let id = 1;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes/main'));
app.use('/upload', require('./routes/upload'));
app.use('/download', require('./routes/download'));

let room = 'room';

io.on('connect', (socket) => {
	let username = "";

	socket.on('disconnect', () => {
		console.log('user ' + username + ' has disconnected');
		io.to(room).emit('leaveRoom', username);
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
		username = name
	});

	socket.on('chat message', (name, msg) => {
		io.to(room).emit('chat message', name, msg);
	});

	socket.on('upload file', (name) => {
		io.to(room).emit('upload success', name, id);
		id++;
	});
});

http.listen(3000, () => {
	console.log('Connect at 3000');
});