import "./index.css";

export default function Card({ title, body }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-body">{body}</p>
    </div>
  );
}
