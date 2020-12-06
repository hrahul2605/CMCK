/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from '../Chat/Chat';
import Editor from '../Editor/Editor';
import Nav from '../Nav/Nav';

const socket: SocketIOClient.Socket = io.connect();

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

  return (
    <>
      {!coolUser && roomRegExp.test(roomID) ? <Redirect to='/' /> : null}
      <div className='flex flex-col h-screen'>
        <Nav name={userName} roomID={roomID} />
        <div className='flex flex-row h-full'>
          <Editor socket={socket} />
          <Chat userName={userName} socket={socket} />
        </div>
      </div>
    </>
  );
};

export default Room;
