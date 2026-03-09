import './App.css'
import { Buscador } from './components/Buscador'
import { Clima } from './components/Clima'
import { useState } from 'react'
import logo from '../public/images/logo.svg'

function App() {
  const ocultarMenu = () => {
    let classItens = document.getElementsByClassName('itens')
    if(classItens[0].className[6] === 'd'){
      classItens[0].classList.remove('desocultar-itens')
      classItens[0].classList.add('ocultar-itens')
    } else if(classItens[0].className[6] === 'o') {
      classItens[0].classList.remove('ocultar-itens')
      classItens[0].classList.add('desocultar-itens')
    }
  }

  const [state, setState] = useState([])

  const getInformacoes = (data)=>{
    setState(data)
  }
  
  return (
    <>
      <div className="container">
            <section className='cabecalho'>
                <img className='imagem-logo' src={logo} alt="previsao do tempo" />
                <div className='menu'>
                  
                  <div className='titulo-menu'>
                    <img className='icone' src="../public/images/icon-units.svg" alt="units" />         
                    <p>Units</p>
                    <img onClick={ocultarMenu} className='icone' src="../public/images/icon-dropdown.svg" alt="" />
                  </div>

                  <div className='itens ocultar-itens'>
                    <div className='item-ativo'>Mudar para Imperial</div>
                    <div className='item-ativo titulo-item'>Temperatura</div>
                    <div className='item-ativo'>Celsius (°C) <img className='icone' src="../public/images/icon-checkmark.svg" alt="Icon checkmark" /></div>
                    <div className='item-ativo'>Fahrenheit (°F)</div>
                    <div className='borda'></div>
                    <div className='item-ativo titulo-item'>Wind Speed</div>
                    <div className='item-ativo'>km/h <img className='icone' src="../public/images/icon-checkmark.svg" alt="Icon checkmark" /></div>
                    <div className='item-ativo'>mph</div>
                    <div className='borda'></div>
                    <div className='item-ativo titulo-item'>Precipitation</div>
                    <div className='item-ativo' >Millimetetros (mm) <img className='icone' src="../public/images/icon-checkmark.svg" alt="Icon checkmark" /></div>
                    <div className='item-ativo' >Inches (in)</div>
                  </div>
                </div>
            </section>
        <Buscador getInformacoes={getInformacoes}></Buscador>
        <Clima dados={state}></Clima>
      </div>
      
    </>
  )
}

export default App
