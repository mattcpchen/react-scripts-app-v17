import React, { useCallback, useState, useEffect } from "react";

interface RectBoxType {
  color: string;
  isCorrect: boolean;
  handleClick: (...args: any[]) => any;
}

const RectBox = (props: RectBoxType) => {
  const { color, isCorrect, handleClick } = props;
  return (
    <div
      data-testid={isCorrect ? 'correct-color' : 'incorrect-color'}
      onClick={handleClick}
      style={{
        width: '100px',
        height: '100px',
        background: `${color}`
      }}
    />
  )
}

export const ColorCodes = () => {
  const [answer, setAnswer] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [btnState, setBtnState] = useState(false);

  const getQuestion = useCallback(() => {
    const answerIndex = Math.floor(Math.random() * 3);
    const questions = [
      _getRandomColor(),
      _getRandomColor(),
      _getRandomColor()
    ];
    setAnswer(questions[answerIndex]);
    setColors(questions);
    setMessage('');
    setBtnState(false);

    function _getRandomColor() {
      const final = ['#'];
      for (let i = 0; i < 3; i++) {
        const colorCode = Math.floor(Math.random() * 255);
        final.push(colorCode.toString(16));
      }
      return final.join('');
    }
  }, []);

  const handleCheckAnswer = (myAnswer: string) => {
    if (message !== '') return;
    if (myAnswer === answer) {
      setMessage('Correct!');
      setBtnState(true);
    } else {
      setMessage('Incorrect!');
      setBtnState(true);
    }
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Color Codes</h1>
      <h2>{answer}</h2>
      <h2>What color is this?</h2>
      <div
        data-testid='color-container'
        style={{ display: 'flex' }}
      >
        {colors.map((color, index) => (
          <RectBox
            key={`ColorBox-${index}`}
            color={color}
            isCorrect={colors[index] === answer}
            handleClick={handleCheckAnswer.bind(null, color)}
          />
        ))}
      </div>
      <div style={{ fontSize: '20px', marginTop: '10px' }}>
        {message && <div style={{ fontWeight: '900' }}>{message}</div>}
        {btnState && <button onClick={getQuestion}>Play Again</button>}
      </div>
    </div>
  );
};
