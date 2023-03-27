import React, { useState } from 'react';
import styled from 'styled-components';

import Autocomplete from './autocomplete/App';
import ColorGame from './color-game/App';
import ImagesHolder from './images-holder/App';

const Controller = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin: 20px auto;
`;

const App = () => {
  const ALL_APPS = [Autocomplete, ColorGame, ImagesHolder];
  const [appIndex, setAppIndex] = useState(0);

  const handleOnClick = (dir) => {
    setAppIndex((prevIndex) => {
      const total = ALL_APPS.length;
      return (prevIndex + dir + total) % total;
    })
  };

  const CurrApp = ALL_APPS[appIndex];

  return (
    <>
      <Controller>
        <button onClick={handleOnClick.bind(this, -1)}>-</button>
        <div>{`Application -  ${appIndex + 1}`}</div>
        <button onClick={handleOnClick.bind(this, 1)}>+</button>
      </Controller>
      <CurrApp />
    </>
  )
}

export default App;