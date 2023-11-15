import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import classNames from 'classnames';

import ChatInput from "../components/ChatInput";
import ChatBubble from '../components/ChatBubble';

const ChatRoom = ({ user }) => {
  const socket = io('http://localhost:3000');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    socket.emit('user-connected', user);
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      if (msg.user.id === user.id) {
        setIsMe(true);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [user]);

  const sendMessage = () => {
    socket.emit('chat message', { user, message });
    setMessage('');
  };

  return (
    <>
      <div>
        <ul className={classNames('flex flex-col', {
          'items-end': isMe,
          'items-start': !isMe,
        })}>
          {console.log('messages', messages)}
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} currentUser={isMe} />
          ))}
        </ul>
      </div>
      <div className="fixed bottom-0 right-0 left-0 lg:pl-72 pr-4">
        <ChatInput
          message={message}
          handleChange={(e) => setMessage(e.target.value)}
          handleSendMessage={sendMessage}
        />
      </div>
    </>
  )
}

export default ChatRoom;
