import { useEffect, useState } from 'react';
import socket from '@/Socket';
 
function ChatPage() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);
 
  useEffect(() => {
    // Listen to messages
    socket.on('receive_message', (msg: string) => {
      setChat((prev) => [...prev, msg]);
    });
 
    // Clean up
    return () => {
      socket.off('receive_message');
    };
  }, []);
 
  const sendMessage = () => {
    socket.emit('send_message', message);
    setMessage('');
  }
}