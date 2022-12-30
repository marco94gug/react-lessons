import "./index.css";

export default function BtnCounter({ text, method, color, textColor }) {
  return (
    <button
      className="main-button"
      style={{ backgroundColor: color, color: textColor }}
      onClick={() => method()}
    >
      {text}
    </button>
  );
}
