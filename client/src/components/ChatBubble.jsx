import React from 'react';
import classNames from 'classnames';

const ChatBubble = ({ message, currentUser }) => {
  const { message: msgContent } = message;
  console.log(message);
  return (
    <li
      className={classNames('w-fit rounded-lg px-4 py-2 text-sm font-semibold shadow-sm my-1 mx-4', {
        'bg-sky-400 text-white': currentUser,
        'bg-green-300 text-gray-600': !currentUser,
      })}
    >
      {msgContent}
    </li>
  );
};

export default ChatBubble;
