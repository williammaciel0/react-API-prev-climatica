import './App.css'
import { Buscador } from './components/Buscador'
import { Clima } from './components/Clima'
import Menu from './components/Menu'
import { useState } from 'react'

function App() {
  const [state, setState] = useState({
    dados: '',
    alternancias: '',
    previsao7Dias: ''
  })
  
  return (
   
      <div className="container">
        <Menu setState={setState}></Menu>
        <Buscador setState={setState}></Buscador>
        <Clima dados={state} ></Clima>
      </div>
    
  )
}

export default App
