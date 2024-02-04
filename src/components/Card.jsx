export default function Card({ data, handleClickEvent }) {
  return (
    <div className="card" onClick={handleClickEvent}>
      <img src={data.img} alt={data.name} />
      <p>{data.name}</p>
    </div>
  );
}
