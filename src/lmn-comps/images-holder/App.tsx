import React, { useMemo, useState } from 'react';
import Play from './images/play.svg';
import Pause from './images/pause.svg';
import ArrowBack from './images/arrow_back.svg';
import ArrowNext from './images/arrow_forward.svg';
import JpgImage from './images/test_jpg.jpg';
import PngImage from './images/test_png.png';

import styled from 'styled-components';

const Container = styled.div`
  margin: 10px auto;
  padding: 10px;
  color: green;
  width: fit-content;
  border: 1px solid black;
  border-radius: 10px;
`;
const ContainerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerContent = styled.div`
  font-size: 12px;
  text-align: center;
`;

const ImgHolder = styled.img`
  width: 100px;
  height: 100px;
`;


const Component_02 = () => {
  const [pid, setPhoto] = useState<number>(0);
  const allPhotos: any[] = useMemo(() => ([
    Play, Pause, ArrowBack, ArrowNext
  ]), []);

  const handleOnClick = () => {
    let newPhoto: number = pid + 1;
    if (newPhoto === allPhotos.length) {
      newPhoto = 0;
    }
    setPhoto(newPhoto);
  }

  return (
    <Container>
      <ContainerHeader>
        A Collection of all Photos
      </ContainerHeader>
      <ContainerContent>
        <li>svg/jpg/png</li>
        <ImgHolder data-testid='JPG_IMAGE' src={JpgImage} />
        <ImgHolder
          data-testid={`SVG_IMG_${pid}`}
          onClick={handleOnClick}
          src={allPhotos[pid]}
        />
        <ImgHolder data-testid='PNG_IMAGE' src={PngImage} />
      </ContainerContent>
    </Container>
  );
}

export default Component_02;