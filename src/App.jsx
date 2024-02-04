import { useState, useEffect } from 'react';
import Card from './components/Card';
import Score from './components/Score';
import Header from './components/Header';
import apiService from './ApiService';
import LoadingScreen from './components/LoadingScreen';
import loadingTimeout from './helpers/loadingTimeout';
import resetCards from './helpers/resetCards';

export default function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pickedCard, setPickedCard] = useState([]);
  const [round, setRound] = useState(0);
  const [showCard, setShowCard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let dataArray = [];
      const totalPokeId = 721;

      while (dataArray.length < 20) {
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
    if (pickedCard.includes(id)) {
      console.log('game over!');
      setPickedCard([]);
      setBestScore((prevScore) => Math.max(prevScore, score));
      setScore(0);
      setRound(0);
    } else {
      setPickedCard((prevCard) => [...prevCard, id]);
      setScore((prevScore) => prevScore + 1);
      setRound((prev) => prev + 1);
      resetCards(pokeData, setShowCard);
    }
  }

  useEffect(() => {
    resetCards(pokeData, setShowCard);
  }, [pokeData]);

  return (
    <>
      <div className="main-container">
        <Header />
        <Score score={score} bestScore={bestScore} />
        <div>Round {round}/10</div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="card-container">
            {showCard.map((poke) => (
              <Card data={poke} key={poke.id} handleClickEvent={() => handleClickEvent(poke.id)} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
