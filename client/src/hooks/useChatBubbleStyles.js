import classNames from 'classnames';

export const useChatBubbleStyles = (isCurrentUser) => {
  return {
    container: classNames(
      'flex flex-col',
      {
        'items-start': !isCurrentUser,
        'items-end': isCurrentUser,
      }
    ),
    bubble: classNames(
      'w-fit rounded-lg px-4 py-2 text-sm font-semibold shadow-sm my-1 mx-4',
      {
        'bg-red-300 text-right': isCurrentUser,
        'bg-gray-300 text-left': !isCurrentUser,
      }
    ),
    message: classNames(
      'text-base font-normal',
      {
        'text-white': isCurrentUser,
        'text-gray-800': !isCurrentUser,
      }
    ),
  };
};
