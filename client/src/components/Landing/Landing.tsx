import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const generateRoomId = (): string => {
  let roomID = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  const len = characters.length;
  for (var i = 0; i < 12; i++) {
    roomID += characters.charAt(Math.floor(Math.random() * len));
    if ((i + 1) % 4 === 0 && i !== 11) roomID += '-';
  }
  return roomID;
};

const Landing: React.FC = (): JSX.Element => {
  const [roomID] = useState(generateRoomId());
  const [roomToJoin, setRoomToJoin] = useState(roomID);
  const [userName, setUserName] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomToJoin(e.target.value);
  };

  return (
    <>
      Landing Page
      <input onChange={handleNameChange} placeholder='Set UserName' />
      <input onChange={handleRoomChange} placeholder='Room' />
      <Link to={{ pathname: roomToJoin, state: { userName } }}>CLICK</Link>
    </>
  );
};

export default Landing;
