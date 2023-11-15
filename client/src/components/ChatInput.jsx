const ChatInput = ({
  message,
  handleChange,
  handleSendMessage,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <div className="flex-1">
        <input
          name="message"
          id="message"
          className="block w-full rounded-full m-2 resize-none border-2 border-gray-500 bg-white px-4 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-md sm:leading-6"
          placeholder="Say something..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatInput;
