import { io } from 'socket.io-client';
 
const socket = io('http://localhost:3000'); // match backend URL
 
export default socket;