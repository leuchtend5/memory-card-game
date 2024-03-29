export default function Instructions() {
  return (
    <div className="instructions-box">
      <ul>
        <li>Your receive a random number of cards each round.</li>
        <li>Each time a card is clicked, all the cards get shuffled around.</li>
        <li>Each card click adds one point to the score.</li>
        <li>You win the game by clicking all the cards once.</li>
        <li>You lose the game by clicking one card twice.</li>
      </ul>
    </div>
  );
}
