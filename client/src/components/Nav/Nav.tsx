import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  roomID: string;
  name: string;
}

const Nav: React.FC<Props> = ({ roomID, name }): JSX.Element => {
  const copyToClipBoard = () => {
    navigator.clipboard
      .writeText(roomID)
      .then(() => alert('Copied'))
      .catch((err) => console.log(err));
  };

  return (
    <div className='flex h-14 bg-secondary justify-between items-center px-6 py-2'>
      <Link to='/'>
        <p className='font-bold text-grey'>
          {`</>`} CMCK - ChaloMilkeCodeKarein
        </p>
      </Link>
      <div className='flex flex-row'>
        <div
          className='bg-pink py-2 px-4 rounded-md cursor-pointer hover:bg-opacity-90'
          onClick={copyToClipBoard}
        >
          <span className='text-sm mr-2 text-black'>Room ID :</span>
          <span className='font-bold text-md text-grey'>{roomID}</span>
        </div>
        <div className='bg-pink py-2 px-4 rounded-md ml-2'>
          <span className='text-sm mr-2 text-black'>NickName :</span>
          <span className='font-bold text-md text-grey'>{name}</span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
