import { useState } from 'react'
import Chat from './components/Chat'

function App() {

  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-slate-300 flex items-center justify-center'>
        <Chat />
      </div>
    </>
  )
}

export default App
