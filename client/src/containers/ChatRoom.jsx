import React, { useState, useEffect, useRef } from 'react';

import useSocket from '../hooks/useSocket';
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
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useSocket(signedInUser);
  const messagesEndRef = useChatScroll(messages);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
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
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default ChatRoom;
