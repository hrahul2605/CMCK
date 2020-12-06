/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ControlledEditor, monaco } from '@monaco-editor/react';
import { Langs, Sizes } from './constants';
const CobaltTheme = require('./themes/cobalt.json')

interface Props {
  socket: SocketIOClient.Socket;
}

const Editor: React.FC<Props> = ({ socket }): JSX.Element => {
  const [code, setCode] = useState('// Code bruh?');
  const [language, setLanguage] = useState('javascript');
  const [isLangOpen, setLangOpen] = useState(false);

  const [fontSize, setfontSize] = useState('18');
  const [isSizeOpen, setSizeOpen] = useState(false);

  useEffect(() => {
    defineTheme('cobalt');
    socket.on('code', (data: any) => {
      setCode(data);
    });

    socket.on('langChange', (data: string) => {
      setLanguage(data);
    });

    return () => {
      socket.off('code');
      socket.off('langChange');
    };
  }, []);

  const onChange = (e: any, value?: string) => {
    socket.emit('code', value);
  };

  const handleLangChange = (lang: string) => {
    setLanguage(lang);
    socket.emit('langChange', lang);
  };

  const toggleLangModal = () => {
    setLangOpen(!isLangOpen);
  };

  const handleSizeChange = (size: string) => {
    setfontSize(size);
  };

  const toggleSizeModal = () => {
    setSizeOpen(!isSizeOpen);
  };

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex flex-row bg-pink px-4 pt-2 pb-2'>
        <div className='flex flex-col w-36'>
          <p className='text-sm text-secondary mb-1'>Language</p>
          <div
            className='rounded-md h-8 w-full bg-secondary flex items-center px-2 text-sm cursor-pointer relative font-medium'
            onClick={toggleLangModal}
          >
            {isLangOpen ? (
              <Languages handleChange={handleLangChange} data={Langs} />
            ) : (
              language
            )}
          </div>
        </div>
        <div className='flex flex-col w-36 ml-4'>
          <p className='text-sm text-secondary mb-1'>Size</p>
          <div
            className='rounded-md h-8 w-full bg-secondary flex items-center px-2 text-sm cursor-pointer relative font-medium'
            onClick={toggleSizeModal}
          >
            {isSizeOpen ? (
              <Languages handleChange={handleSizeChange} data={Sizes} />
            ) : (
              fontSize
            )}
          </div>
        </div>
      </div>
      <div className='h-full'>
        <ControlledEditor
          value={code}
          theme='cobalt'
          language={language}
          onChange={onChange}
          options={{
            fontFamily: 'Cascadia Code',
            fontSize: parseInt(fontSize, 10),
          }}
          className='overflow-y-hidden'
        />
      </div>
    </div>
  );
};

interface LangProps {
  data: string[];
  handleChange: (data: string) => void;
}

const Languages: React.FC<LangProps> = ({
  handleChange,
  data,
}): JSX.Element => {
  return (
    <div className='flex flex-col bg-secondary rounded-md p-2 absolute top-0 left-0 w-36 h-96 text-black font-medium overflow-y-scroll z-50'>
      {data.map((item) => (
        <div
          key={item}
          onClick={() => handleChange(item)}
          className='w-full flex h-24 hover:bg-grey rounded-md items-center mb-2 pl-2 py-1 hover:text-secondary cursor-pointer'
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const defineTheme = (theme: string) => {
  return new Promise(() => {
    Promise.all([monaco.init(), CobaltTheme]).then(
      ([monaco, themeData]) => {
        monaco.editor.defineTheme(theme, themeData);
      }
    );
  });
};

export default Editor;
