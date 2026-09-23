import useLocalStorage from "../hooks/useLocalStorage";

function NotesManager() {
  const [draft, setDraft] = useLocalStorage("note_draft", "");
  const [notes, setNotes] = useLocalStorage("saved_notes", []);

  const addNote = () => {
    if (!draft.trim()) {
      return;
    }

    const newNote = {
      id: Date.now(),
      text: draft,
    };

    setNotes((prev) => [...prev, newNote]);
    setDraft("");
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="notes-manager">
      <h2> Менеджер заметок</h2>

      <textarea
        placeholder="Введите заметку..."
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />

      <button onClick={addNote}>
        Добавить заметку
      </button>

      <h3>Сохранённые заметки</h3>

      {notes.map((note) => (
        <div className="note" key={note.id}>
          <p>{note.text}</p>

          <button onClick={() => deleteNote(note.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotesManager;