import React from 'react';
// import classNames from 'classnames';

const ChatBubble = ({ content }) => {
  const { user, message } = content;
  return (
    <li
      className="w-fit rounded-lg px-4 py-2 text-sm font-semibold shadow-sm my-1 mx-4 bg-red-300"
    >
      <div>
        <span className="text-gray-800 font-bold">{user.username}: </span>
        <span className="text-white">{message}</span>
      </div>
    </li>
  );
};

export default ChatBubble;
