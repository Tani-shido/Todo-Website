import { Children } from 'react';
import './App.css'

function App() {

  function takeInput (){
    const inputValue = input.value;
    return<>
    <div>

    </div>
    </>
  }

  function onClick(){

    return<><div>
      hi there
    </div>
    </>
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
        <input type="text" placeholder='Enter your task' className='p-4 w-full md:w-3xl bg-blue-300 border-none rounded-xl text-xl focus:outline-none focus:bg-blue-200'/>
        <button onClick={onClick()} className=' p-2 md:p-4 w-32 md:w-xs bg-blue-200 border-2 border-blue-500 rounded-xl text-xl shadow-md hover:bg-blue-300 hover:font-semibold transition-all duration-150'>Submit</button>
      </div>
      <div className='mt-4 p-4 h-80 bg-blue-300 border-none rounded-xl text-xl shadow-md'>
        1. Grind MF <button className='px-2 bg-blue-500 border-none rounded-lg text-white font-bold '>O</button> <button className='px-2 bg-blue-500 border-none rounded-lg text-white font-bold '>X</button>
      </div>
    </div>
  </div></>
}

export default App
