import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (!task.trim()) return;

    if (editId) {
      setTasks(
        tasks.map((item) =>
          item.id === editId
            ? { ...item, text: task }
            : item
        )
      );
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: task,
        },
      ]);
    }

    setTask("");
  };

  const editTask = (item) => {
    setTask(item.text);
    setEditId(item.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-300 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-blue-50 rounded-2xl shadow-xl p-7">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          TO-DO App
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-3 rounded-lg text-base outline-none bg-white text-gray-800 border border-gray-300"
          />

          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <div className="bg-violet-100 rounded-lg p-3 mb-5 text-slate-700 font-semibold">
          Total Tasks: {tasks.length}
        </div>

        {tasks.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            No Tasks Available
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-xl p-3 shadow-md flex justify-between items-center"
              >
                <span className="text-base font-medium text-gray-800">
                  {item.text}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => editTask(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}