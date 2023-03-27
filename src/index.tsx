import React, { useState } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import reportWebVitals from './reportWebVitals';

import AbcCollection from './abc-comps/App';
import LmnCollection from './lmn-comps/App';
import XyzCollection from './xyz-comps/App';

const Controller = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin: 20px auto;
`;

const Application = () => {
  const ALL_COLLS = [AbcCollection, LmnCollection, XyzCollection];
  const [currColl, setCollsetCurrColl] = useState(0);

  const handleOnClick = (dir: number) => {
    setCollsetCurrColl((prevCol) => {
      const total = ALL_COLLS.length;
      return (prevCol + dir + total) % total;
    })
  };

  const Collection = ALL_COLLS[currColl];
  return (
    <div>
      <Controller>
        <button onClick={handleOnClick.bind(this, -1)}>-</button>
        <div>{`Collection -  ${currColl + 1}`}</div>
        <button onClick={handleOnClick.bind(this, 1)}>+</button>
      </Controller>
      <Collection />
    </div>
  );
}


render((
  <React.StrictMode>
    <Application />
  </React.StrictMode>
), document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
