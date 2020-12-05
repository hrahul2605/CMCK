import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  const [roomID] = useState(generateRoomId());
  const [roomToJoin, setRoomToJoin] = useState(roomID);
  const [userName, setUserName] = useState('');
  const roomRegExp = new RegExp('(([A-Za-z0-9]{4})(-)){2}[A-Za-z0-9]{4}');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomToJoin(e.target.value);
  };

  const handleJoinRoom = (create: boolean) => {
    if (!roomRegExp.test(roomToJoin)) alert('Room ID format invalid.');
    else if (!userName.length) alert('Please Enter your Nickname.');
    else history.push(create ? roomID : roomToJoin, { userName });
  };

  return (
    <div className='flex flex-row h-screen bg-secondary'>
      <div className='flex flex-1 flex-col justify-center p-24'>
        <p className='font-bold text-4xl text-pink'>
          CMCK - ChaloMilkeCodeKarein
        </p>
        <p className='font-medium text-xl text-grey mt-4'>
          CMCK is a platform to help you <br /> code & chat with your friends
          simultaneously.
        </p>
        <input
          onChange={handleNameChange}
          placeholder='Nick Name'
          value={userName}
          className='mt-10 w-48 h-14 rounded-md flex items-center px-4 font-semibold text-pink bg-secondary outline-none placeholder-pink border-2 border-pink'
        />
        <div className='flex flex-row mt-4'>
          <div
            onClick={() => handleJoinRoom(true)}
            className='h-14 w-48 bg-pink rounded-md flex items-center px-4 font-semibold text-secondary hover:bg-opacity-90 mr-4 cursor-pointer'
          >
            Create Room
          </div>
          <div className='relative h-18 flex flex-row items-center'>
            <p className='absolute -top-2 bg-secondary ml-4 w-24 text-center text-sm font-medium text-grey'>
              Join Room
            </p>
            <input
              onChange={handleRoomChange}
              maxLength={14}
              placeholder='xxxx-yyyy-zzzz'
              className='w-56 h-14 rounded-md flex items-center px-4 font-semibold text-pink bg-secondary outline-none placeholder-pink border-2 border-pink'
            />
            {roomID !== roomToJoin && roomRegExp.test(roomToJoin) && (
              <p
                onClick={() => handleJoinRoom(false)}
                className='ml-4 text-grey cursor-pointer'
              >
                Join
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
