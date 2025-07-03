import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
 
const app = express();
const server = http.createServer(app);
 
app.use(cors()); // allow all for dev
 
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // your React app URL
    methods: ['GET', 'POST'],
  },
});
 
// When client connects
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);
 
  socket.on('send_message', (data) => {
    console.log('💬 Message:', data);
    io.emit('receive_message', data); // broadcast to all
  });
 
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});
 
server.listen(3000, () => {
  console.log('✅ Socket.IO server running at http://localhost:3000');
});