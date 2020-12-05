/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ControlledEditor, monaco } from '@monaco-editor/react';

interface Props {
  socket: SocketIOClient.Socket;
}

const Editor: React.FC<Props> = ({ socket }): JSX.Element => {
  const [code, setCode] = useState('// Code bruh?');

  useEffect(() => {
    defineTheme('cobalt');
    socket.on('code', (data:any) => {
        setCode(data);
    });
  }, []);

  const onChange = (e: any, value?: string) => {
    socket.emit('code', value);
  };

  return (
    <div className='h-screen overflow-y-hidden flex-1'>
      <ControlledEditor
        value={code}
        theme='cobalt'
        language='cpp'
        onChange={onChange}
      />
    </div>
  );
};

const defineTheme = (theme: string) => {
  return new Promise(() => {
    Promise.all([monaco.init(), import(`./themes/${theme}.json`)]).then(
      ([monaco, themeData]) => {
        monaco.editor.defineTheme(theme, themeData);
      }
    );
  });
};

export default Editor;
