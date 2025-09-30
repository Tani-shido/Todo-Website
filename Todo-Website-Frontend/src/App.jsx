import './App.css'
import Container from './components/Container'

function App() {
  return (
    <>
      <div className='w-full min-h-screen bg-zinc-600 flex flex-col items-center p-4'>
        <div className='w-full max-w-4xl md:mt-12 p-4 rounded mx-auto bg-zinc-500 shadow-lg text-xl'>
          <div className='mb-4 text-center'>
            <h1 className="text-4xl font-bold text-white">A Page To-do</h1>
          </div>
          <div>
            <Container />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
