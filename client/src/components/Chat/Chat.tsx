/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as SendIcon } from '../../assets/send.svg';
interface messageType {
  userName: string;
  message: string;
  time: number;
}

interface props {
  sendMessage: (data: messageType) => void;
  userName: string;
  socket: SocketIOClient.Socket;
}

const Chat: React.FC<props> = ({
  sendMessage,
  userName,
  socket,
}): JSX.Element => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<messageType[]>([]);
  const chatInput = useRef<HTMLInputElement>(null);

  // Updates the existing chat history
  const handleChatAdd = (data: messageType): void => {
    setChat((chat) => [...chat, data]);
    setMessage('');
  };

  // Sends the message - socket
  const handleSend = (): void => {
    if (message.length) {
      const time = Date.now();
      sendMessage({ message, time, userName });
      handleChatAdd({ message, time, userName });
    }
    chatInput.current?.focus();
  };

  // To check if Enter is pressed
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSend();
    }
  };

  useEffect(() => {
    chatInput.current?.focus();
    socket.on('chat', (data: messageType) => {
      handleChatAdd(data);
    });

    return () => {
      socket.off('chat');
    };
  }, []);

  useEffect(() => {
    const chatMessage = document.querySelector('#chat-message')!;
    chatMessage.scrollTop = chatMessage.scrollHeight;
  }, [chat]);

  return (
    <div className='flex-1 flex-col bg-black'>
      <div
        id='chat-message'
        className='my-8 mx-2 px-4 flex-1 flex-col h-5/6 overflow-y-scroll'
      >
        {chat.map((item) => (
          <Message {...item} key={item.time} cur={item.userName === userName} />
        ))}
      </div>
      <div className='flex flex-1 bg-grey h-20 fixed bottom-0 left-1/2 right-0 rounded-t-xl justify-center items-center px-4'>
        <input
          type='text'
          placeholder='Enter dabayega toh message jayega'
          className='focus:outline-none rounded-xl h-12 w-4/5 p-2 text-sm text-black font-medium bg-secondary'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          value={message}
          ref={chatInput}
        />
        <SendIcon
          className={`ml-6 ${
            message.length ? 'cursor-pointer text-secondary' : 'text-black'
          } transform scale-120`}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

interface type {
  cur: boolean;
  userName: string;
  message: string;
  time: number;
}

const Message: React.FC<type> = ({
  message,
  time,
  userName,
  cur,
}): JSX.Element => {
  return (
    <div className={`flex ${cur ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`break-words my-1 rounded-t-3xl rounded-b-3xl p-2 px-5 w-96 h-auto ${
          cur ? 'bg-pink' : 'bg-grey'
        }`}
      >
        <p
          className={`text-sm mb-1 font-medium ${
            cur ? 'text-secondary' : 'text-pink'
          }`}
        >
          {message}
        </p>
        <p className={`text-xs ${cur ? 'text-grey' : 'text-secondary'}`}>
          <span className='font-light'>{!cur && 'from: '}</span>
          {cur ? 'You' : `${userName}`} <span className='font-light'>at: </span>
          {new Date(time).toTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Chat;
