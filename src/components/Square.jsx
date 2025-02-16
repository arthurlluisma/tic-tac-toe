export default function Square({ styles, value, onSquareClick }) {
  return (
    <button className={styles} onClick={onSquareClick}>
      {value}
    </button>
  );
}
