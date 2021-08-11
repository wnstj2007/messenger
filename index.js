const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes/main'));
app.use('/upload', require('./routes/upload'));

app.get('/download', (req, res) => {
	res.download('./uploads/c76a3159f46603b69995790002512b9c');
});

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
		io.to(room).emit('upload file', name, '');
	});
});

http.listen(3000, () => {
	console.log('Connect at 3000');
});