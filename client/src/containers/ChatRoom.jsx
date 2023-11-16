import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";

import ChatInput from "../components/ChatInput";
import ChatBubble from '../components/ChatBubble';

const useChatScroll = (messages) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return messagesEndRef;
};

const ChatRoom = ({ signedInUser }) => {
  const socket = io('http://localhost:3000');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useChatScroll(messages);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
    socket.emit('user-connected', signedInUser);
    socket.on('message', (newMessage) => {
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    });
    socket.on('disconnect', () => {
      console.log('User has disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, [signedInUser]);

  const sendMessage = () => {
    const messageObject = { user: signedInUser, message: message };
    socket.emit('message', messageObject);
    setMessage('');
  };

  return (
    <div>
      <div className="mb-8">
        <ul className="flex flex-col items-end">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              content={message}
            />
          ))}
        </ul>
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 right-0 left-0 lg:pl-72 pr-4 border-t border-gray-200 w-full bg-gray-500">
        <ChatInput
          message={message}
          handleChange={(e) => setMessage(e.target.value)}
          handleSendMessage={sendMessage}
        />
      </div>
    </div>
  )
}

export default ChatRoom;
