export default function Score({ score, bestScore }) {
  return (
    <div className="score-container">
      <div>Best Score : {bestScore}</div>
      <div>Score : {score}</div>
    </div>
  );
}
