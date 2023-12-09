import React from 'react';
import { useChatBubbleStyles } from '../hooks/useChatBubbleStyles';

const ChatBubble = ({ content, isCurrentUser }) => {
  const { user, message } = content;
  const styles = useChatBubbleStyles(isCurrentUser);

  return (
    <div className={styles.container}>
      <li className={styles.bubble}>
        <div>
          <span>{user.username?.substring(0, 2).toUpperCase()}: </span>
          <span className={styles.message}>{message}</span>
        </div>
      </li>
    </div>
  );
};

export default ChatBubble;