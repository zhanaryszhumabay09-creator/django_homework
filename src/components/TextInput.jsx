function TextInput({ value, onChange }) {
  return (
    <div>
      <label>Введите текст:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Напишите что-нибудь..."
      />
    </div>
  );
}

export default TextInput;