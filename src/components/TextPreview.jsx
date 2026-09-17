function TextPreview({ text }) {
  return (
    <div className="preview">
      <h3>Предпросмотр:</h3>
      <p>{text || "Здесь появится ваш текст"}</p>
    </div>
  );
}

export default TextPreview;