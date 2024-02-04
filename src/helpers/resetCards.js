export default function resetCards(dataArray, setShowCard) {
  const shuffle = dataArray.sort(() => Math.random() - 0.5);
  const newArray = shuffle.slice(0, 5);
  setShowCard(newArray);
}
