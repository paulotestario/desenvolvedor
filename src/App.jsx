import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [msg, setMsg] = useState("Olá!");


  return (
    <div>
       <h1>{msg} </h1>

    <button 
    onClick={()=> {
      setMsg("Clicou");
    }} > mudar Mensagem
    </button> </div>
  )
}

export default App
