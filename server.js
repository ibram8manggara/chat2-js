const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/room.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'room.html'));
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (data) => {
    const { roomID, userName } = data;

    // Bergabung ke ruang chat dengan ID yang diberikan
    socket.join(roomID);

    // Mengirim pesan selamat datang ke ruang chat
    io.to(roomID).emit('chatMessage', {
      message: `Selamat datang, ${userName}! Anda berada di ruang chat dengan ID: ${roomID}`,
    });
  });

  socket.on('chatMessage', (data) => {
    const { roomID, message } = data;

    // Mengirim pesan ke ruang chat yang sesuai
    io.to(roomID).emit('chatMessage', { message });
  });
});

const port = process.env.PORT || 80;

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
