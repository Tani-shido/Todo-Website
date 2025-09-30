import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'

function Container1() {

    const {register, handleSubmit, reset} = useForm();
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

    const handleTaskSubmit = async data => {
      try {
        const response = await fetch('/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: data.Task })
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Success:', result);
          reset();
          fetchTodos();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

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

  return <>
    <div className='w-full  rounded outline-none'>
      <div className='text-center'>
        <h1 className='text-3xl font-semibold py-8'>Add a todo</h1>
        <form action="" onSubmit={handleSubmit(handleTaskSubmit)}>
            <input {...register('Task')} className='border rounded-xl py-2 px-2 m-1 outline-none bg-zinc-400' type="text" placeholder='Task' />
            <input className='border-none rounded-full py-2 px-2 m-1 text-md font-semibold text-white bg-zinc-600 cursor-pointer' type="submit" />
        </form>
        <div className='border-2 border-zinc-700 rounded-xl bg-zinc-400 h-100 mt-4 p-2'>
          {todos.map((todo, index)=>(
            <div className={`m-2 p-2 border rounded text-start flex justify-between items-center gap-2 ${todo.isCompleted ? "bg-zinc-500" : "bg-zinc-300"}`} key={todo._id}>
              
              {/* THIS IS THE FIX */}
              <h1 className={`flex-grow ${todo.isCompleted ? 'line-through opacity-50' : ''}`}>{index+1}. {todo.Task}</h1>
              
              <span className='flex'>
                {/* Improvement: Hide the checkmark if already completed */}
                {!todo.isCompleted && (
                  <button onClick={() => handleComplete(todo._id)} className="px-2 mx-1 text-md bg-green-500 text-white rounded">
                    ✓
                  </button>
                )}
                <button onClick={() => handleDelete(todo._id)} className="px-2  mx-1 text-md bg-red-500 text-white rounded">
                  X
                </button>
              </span>
            </div>
          ))}
        </div>
    </div>
    </div>
  </>
}

export default Container1;
