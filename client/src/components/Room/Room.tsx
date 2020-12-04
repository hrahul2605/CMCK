/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from '../Chat/Chat';

const socket: SocketIOClient.Socket = io.connect('http://localhost:5000/');

interface messageType {
  userName: string;
  message: string;
  time: number;
}

const Room: React.FC = (): JSX.Element => {
  const { pathname, state } = useLocation<any>();
  const roomID = pathname.split('/')[1];
  const roomRegExp = new RegExp('(([A-Za-z0-9]{4})(-)){2}[A-Za-z0-9]{4}');
  const userName = state && state.userName;
  const [coolUser] = useState(userName && userName.length > 0);

  useEffect(() => {
    if (coolUser && roomRegExp.test(roomID))
      socket.emit('joinRoom', { roomID, userName });
  }, []);

  useEffect(() => {
    socket.on('userJoined', (name: string) => {
      console.log(`${name} JOINED.`);
    });

    socket.on('userDisconnect', (name: string) => {
      console.log(`${name} DISCONNECTED.`);
    });

    return () => {
      socket.off('userJoined', () => {
        socket.off('userDisconnected');
      });
    };
  }, []);

  const sendMessage = (data: messageType) => {
    socket.emit('chat', data);
  };

  return (
    <>
      {!coolUser && roomRegExp.test(roomID) ? <Redirect to='/' /> : null}
      <div className='flex h-screen'>
        <div className='flex-1'></div>
        <Chat sendMessage={sendMessage} userName={userName} socket={socket} />
      </div>
    </>
  );
};

export default Room;
