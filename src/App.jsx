import { Children } from 'react';
import { useState } from 'react';
import './App.css'

function App() {

  const [inputValue, setInputValue] = useState('');

  const [tasks, setTasks] = useState([
    { id: 1, text: "Grind MF" },
    { id: 2, text: "Learn React State" }
  ]);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    if (inputValue.trim() === '') {
      return; 
    }

    console.log("Adding new task:", inputValue);

    const newTask = {
      id: Date.now(), 
      text: inputValue
    };

    setTasks([...tasks, newTask]);

    setInputValue('');
  };
  
  const handleDelete = (idToDelete) => {
    console.log("Deleting task with id:", idToDelete);

    setTasks(tasks.filter(task => task.id !== idToDelete));
  }


  return <>
  <div className='h-full w-full'>
    <div className='w-full md:w-7xl md:mt-32 p-4 mx-auto bg-blue-100 rounded-xl '>
      <div className='flex justify-between'>
        <div className='p-4 bg-blue-400 border-none rounded-xl hover:bg-blue-300 hover:font-semibold shadow-md transition-all duration-150'>Todo The App</div>
        <div className='p-4 bg-blue-400 border-none rounded-xl hover:bg-blue-300 hover:font-semibold shadow-md transition-all duration-150'>New Todo</div>
      </div>
      <div className='p-8 mt-12 bg-blue-300 text-2xl text-center font-semibold border-none rounded-xl shadow-md transition-all duration-150'>
        Add a Todo
      </div>
      <div className='mt-12 p-4 border-none rounded-xl shadow-md text-center bg-blue-400 md:flex justify-evenly'>
        <form onSubmit={handleSubmit} className='mt-12 p-4 border-none rounded-xl shadow-md text-center bg-blue-400 md:flex justify-evenly'>
          <input type="text" placeholder='Enter your task' value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='p-4 w-full md:w-3xl bg-blue-300 border-none rounded-xl text-xl focus:outline-none focus:bg-blue-200'/>
          <button  className=' p-2 md:p-4 w-32 md:w-xs bg-blue-200 border-2 border-blue-500 rounded-xl text-xl shadow-md hover:bg-blue-300 hover:font-semibold transition-all duration-150'>Submit</button>
        </form>
      </div>
      <div className='mt-4 p-4 h-80 bg-blue-300 border-none rounded-xl text-xl shadow-md'>
        {tasks.map((task) => (
            <div key={task.id} className='flex justify-between items-center p-2 border-b border-blue-400'>
              <span>{task.text}</span>
              <div>
                <button className='px-2 bg-green-500 border-none rounded-lg text-white font-bold mr-2'>✓</button>
                <button 
                  onClick={() => handleDelete(task.id)}
                  className='px-2 bg-red-500 border-none rounded-lg text-white font-bold transition-all duration-1000'>X</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div></>
}

export default App
