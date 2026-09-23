import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./tasksApi";
import "./App.css";

const emptyForm = {
  title: "",
  description: "",
  status: "Новая",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [filter, setFilter] = useState("Все");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Получение задач
  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
      setError("Ошибка загрузки задач");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // Изменение полей формы
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Добавление или редактирование
  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Введите название задачи");
      return;
    }

    try {
      setError("");

      if (editingId !== null) {
        const updatedTask = await updateTask(
          editingId,
          form
        );

        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingId ? updatedTask : task
          )
        );

        setEditingId(null);
      } else {
        const newTask = await createTask(form);

        setTasks((prev) => [...prev, newTask]);
      }

      setForm(emptyForm);
    } catch (error) {
      console.error(error);
      setError("Ошибка сохранения задачи");
    }
  }

  // Удаление
  async function handleDelete(id) {
    try {
      setError("");

      await deleteTask(id);

      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("Ошибка удаления задачи");
    }
  }

  // Редактирование
  function startEdit(task) {
    setEditingId(task.id);

    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

  // Отмена редактирования
  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  // Фильтр
  const filteredTasks =
    filter === "Все"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="app">
      <h1> Менеджер задач</h1>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <form
        className="task-form"
        onSubmit={handleSubmit}
      >
        <h2>
          {editingId !== null
            ? " Редактирование"
            : " Новая задача"}
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Название задачи"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Описание задачи"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Новая">Новая</option>
          <option value="В процессе">В процессе</option>
          <option value="Выполнена">Выполнена</option>
        </select>

        <button type="submit">
          {editingId !== null
            ? "Сохранить изменения"
            : "Добавить задачу"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={cancelEdit}
          >
            Отмена
          </button>
        )}
      </form>

      <div className="filter">
        <label>Фильтр: </label>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="Все">Все</option>
          <option value="Новая">Новая</option>
          <option value="В процессе">В процессе</option>
          <option value="Выполнена">Выполнена</option>
        </select>
      </div>

      {loading && <p>Загрузка...</p>}

      <div className="tasks">
        {filteredTasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <span className="status">
              {task.status}
            </span>

            <div>
              <button onClick={() => startEdit(task)}>
                 Изменить
              </button>

              <button onClick={() => handleDelete(task.id)}>
                 Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && filteredTasks.length === 0 && (
        <p>Задач пока нет.</p>
      )}
    </div>
  );
}

export default App;