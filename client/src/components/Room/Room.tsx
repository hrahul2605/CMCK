/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000/');

const Room: React.FC = (): JSX.Element => {
  const { pathname, state } = useLocation<any>();
  const roomID = pathname.split('/')[1];
  const userName = state && state.userName;
  const [coolUser] = useState(userName && userName.length > 0);

  useEffect(() => {
    if (coolUser) socket.emit('joinRoom', { roomID, userName });
  }, []);

  socket.on('userJoined', (name: string) => {
    console.log(`${name} JOINED.`);
  });

  socket.on('userDisconnect', (name: string) => {
    console.log(`${name} DISCONNECTED.`);
  });

  return (
    <>
      {!coolUser ? <Redirect to='/' /> : null}
      Room
    </>
  );
};

export default Room;
