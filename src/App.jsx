import { useState, useEffect } from 'react';
import Card from './components/Card';
import Score from './components/Score';
import Header from './components/Header';
import apiService from './apiService';
import LoadingScreen from './components/LoadingScreen';
import loadingTimeout from './helpers/loadingTimeout';
import resetCards from './helpers/resetCards';
import Footer from './components/Footer';
import GameOver from './components/GameOver';
import GameWinning from './components/GameWinning';

export default function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pickedCard, setPickedCard] = useState([]);
  const [round, setRound] = useState(0);
  const [showCard, setShowCard] = useState([]);
  const [toggleInstruction, setToggleInstruction] = useState(false);
  const [toggleGameOver, setToggleGameOver] = useState(false);
  const [toggleGameWinning, setToggleGameWinning] = useState(false);

  function handleToggleInstruction() {
    setToggleInstruction(!toggleInstruction);
  }

  useEffect(() => {
    async function fetchData() {
      let dataArray = [];
      const totalPokeId = 721;

      while (dataArray.length < 18) {
        const randomId = Math.floor(Math.random() * totalPokeId) + 1;
        const isUnique = !dataArray.some((id) => id === randomId);

        if (isUnique) {
          dataArray.push(randomId);
        }
      }

      const result = await Promise.all(dataArray.map(apiService));
      setPokeData(result);
      loadingTimeout(setLoading);
    }

    fetchData();
  }, []);

  function handleClickEvent(id) {
    if (round === 10) {
      setToggleGameWinning(true);
      setPickedCard([]);
      setBestScore((prevScore) => Math.max(prevScore, score));
      resetCards(pokeData, setShowCard);
      setScore(0);
      setRound(0);
    } else if (pickedCard.includes(id)) {
      setToggleGameOver(true);
      setPickedCard([]);
      setBestScore((prevScore) => Math.max(prevScore, score));
      resetCards(pokeData, setShowCard);
      setScore(0);
      setRound(0);
    } else {
      setPickedCard((prevCard) => [...prevCard, id]);
      setScore((prevScore) => prevScore + 1);
      setRound((prev) => prev + 1);
      resetCards(pokeData, setShowCard);
      setToggleGameOver(false);
    }
  }

  useEffect(() => {
    resetCards(pokeData, setShowCard);
  }, [pokeData]);

  function handleToggleBlur() {
    if (toggleInstruction) {
      setToggleInstruction(!toggleInstruction);
    } else if (toggleGameOver) {
      setToggleGameOver(!toggleGameOver);
    } else {
      setToggleGameWinning(!toggleGameWinning);
    }
  }

  return (
    <>
      {toggleInstruction || toggleGameOver || toggleGameWinning ? (
        <div className="blur-bg" onClick={handleToggleBlur}></div>
      ) : null}
      {toggleGameOver ? <GameOver /> : null}
      {toggleGameWinning ? <GameWinning /> : null}
      <div className="main-container">
        <Header handleClickEvent={handleToggleInstruction} toggleInstruction={toggleInstruction} />
        <Score score={score} bestScore={bestScore} />
        <div className="round">Round {round}/10</div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="card-container">
            {showCard.map((poke) => (
              <Card data={poke} key={poke.id} handleClickEvent={() => handleClickEvent(poke.id)} />
            ))}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
