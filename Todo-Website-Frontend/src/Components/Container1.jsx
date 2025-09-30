import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
        setTodos(todoList);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleTaskSubmit = async (data) => {
    // Prevent submitting empty tasks
    if (!data.Task || data.Task.trim() === "") return;
    try {
      const response = await fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: data.Task })
      });
      if (response.ok) {
        reset();
        fetchTodos();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: true }),
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  return (
    <>
      <div className='w-full rounded outline-none'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold py-8'>Add a todo</h1>
          <form onSubmit={handleSubmit(handleTaskSubmit)}>
            <input
              {...register('Task')}
              className='border rounded-xl py-2 px-2 m-1 outline-none bg-zinc-400 placeholder:text-gray-700'
              type="text"
              placeholder='Task'
              autoComplete="off"
            />
            <input className='border-none rounded-full py-2 px-2 m-1 text-md font-semibold text-white bg-zinc-600 cursor-pointer' type="submit" />
          </form>
          <div className='mt-4 p-2 border-2 border-zinc-700 rounded-xl bg-zinc-400'>
            {todos.length > 0 ? todos.map((todo, index) => (
              <div className="m-2 p-2 border rounded text-start flex justify-between items-center gap-2" key={todo._id}>
                <h1 className={`flex-grow ${todo.isCompleted ? 'line-through opacity-70' : ''}`}>
                  {index + 1}. {todo.Task}
                </h1>
                <span className='flex flex-shrink-0'>
                  {!todo.isCompleted &&
                    <button onClick={() => handleComplete(todo._id)} className="px-2 mx-1 text-md font-semibold bg-green-500 text-white rounded">
                      ✓
                    </button>
                  }
                  <button onClick={() => handleDelete(todo._id)} className="px-2 mx-1 text-md font-semibold bg-red-500 text-white rounded">
                    X
                  </button>
                </span>
              </div>
            )) : <p className='p-4'>No tasks yet. Add one!</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Container1
