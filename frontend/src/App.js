import { useState, useEffect } from "react";

const API = "https://rails-task-manager-ypur.onrender.com/api/v1/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: { title, description, completed: false, deadline} }),
    });
    setTitle("");
    setDescription("");
    setDeadline("");
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await fetch(`${API}/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: { completed: !task.completed } }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1 style={{ color: "#2a78d6" }}>Task Manager</h1>

      <div style={{ background: "#f5f5f5", padding: 20, borderRadius: 8, marginBottom: 24 }}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8, borderRadius: 4, border: "1px solid #ccc", boxSizing: "border-box" }}
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8, borderRadius: 4, border: "1px solid #ccc", boxSizing: "border-box" }}
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8, borderRadius: 4, border: "1px solid #ccc", boxSizing: "border-box" }}
        />
        <button
          onClick={addTask}
          style={{ background: "#2a78d6", color: "white", border: "none", padding: "8px 20px", borderRadius: 4, cursor: "pointer" }}
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 && <p style={{ color: "#888" }}>No tasks yet. Add one above!</p>}

      {tasks.map((task) => (
        <div key={task.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", marginBottom: 8, background: "white", borderRadius: 8, border: "1px solid #e0e0e0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            <div>
              <div style={{ fontWeight: 500, textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "#888" : "#000" }}>
                {task.title}
              </div>
              {task.description && <div style={{ fontSize: 13, color: "#888" }}>{task.description}</div>}
              {task.deadline && <div style={{ fontSize: 12, color: "#e67e22" }}>O {new Date(task.deadline).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true })}</div>}
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            style={{ background: "#ff4444", color: "white", border: "none", padding: "4px 12px", borderRadius: 4, cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
