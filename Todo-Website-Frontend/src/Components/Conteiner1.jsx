import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Container1() {
  const { register, handleSubmit, reset } = useForm();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/todos');
      if (response.ok) {
        const todoList = await response.json();
        console.log('get Success:', todoList);
        setTodos(todoList);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleTaskSubmit = async (data) => {
    try {
      const response = await fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: data.Task }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        reset();
        fetchTodos(); // Refresh list after adding
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // --- NEW: Function to handle deleting a todo ---
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Todo deleted successfully');
        fetchTodos(); // Refresh list after deleting
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // --- NEW: Function to handle completing a todo ---
  const handleComplete = async (id) => {
    try {
      const response = await fetch(`/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: true }), // Send the update
      });
      if (response.ok) {
        console.log('Todo marked as complete');
        fetchTodos(); // Refresh list after updating
      }
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  return (
    <>
      <div className="w-full border rounded outline-none p-2">
        <div className="text-center">
          <h1>Add a todo</h1>
          <form onSubmit={handleSubmit(handleTaskSubmit)}>
            <input
              {...register('Task')}
              className="border rounded py-2 px-2 m-1 outline-none"
              type="text"
              placeholder="Task"
            />
            <input
              className="border rounded py-2 px-2 m-1 cursor-pointer"
              type="submit"
            />
          </form>
          {/* --- CHANGED: Updated rendering logic --- */}
          <div className="mt-4">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between p-2 my-1 border rounded"
              >
                {/* Apply conditional styling based on isCompleted status */}
                <h1
                  className={`flex-grow ${
                    todo.isCompleted ? 'line-through opacity-50' : ''
                  }`}
                >
                  {todo.Task}
                </h1>
                <div className="flex gap-2">
                  {/* Don't show complete button if already completed */}
                  {!todo.isCompleted && (
                    <button
                      onClick={() => handleComplete(todo._id)}
                      className="px-2 py-1 text-sm bg-green-500 text-white rounded"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Container1;
