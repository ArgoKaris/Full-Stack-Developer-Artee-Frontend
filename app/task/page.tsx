"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
  dueDate?: string;
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // =====================
  // FETCH TASKS
  // =====================
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =====================
  // CREATE TASK
  // =====================
  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:3000/api/tasks",
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // =====================
  // DELETE TASK
  // =====================
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  // =====================
  // TOGGLE STATUS
  // =====================
  const handleToggleStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("token");

    await axios.patch(
      `http://localhost:3000/api/tasks/${id}/status`,
      {
        status: status === "PENDING" ? "COMPLETED" : "PENDING",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Task Management</h1>

      {/* CREATE FORM */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 text-gray-500">
        <input
          className="border p-2 w-full mb-2 text-gray-500"
          placeholder ="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2 text-gray-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No task found</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              {/* LEFT */}
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-500">
                  {task.description}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.status === "COMPLETED"
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleToggleStatus(task.id, task.status)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Toggle
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}