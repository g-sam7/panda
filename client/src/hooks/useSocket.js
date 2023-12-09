import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (signedInUser) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.emit('user-connected', signedInUser);

    newSocket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    newSocket.on('disconnect', () => {
      console.log('User has disconnected from server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [signedInUser]);


  const sendMessage = (messageContent) => {
    if (socket) {
      const messageObject = { user: signedInUser, message: messageContent };
      socket.emit('message', messageObject);
    }
  };

  return { messages, sendMessage };
};

export default useSocket;
