import "./style.css"

// importação de imagens para carregar no github pages
import iconUnits from '../../../public/images/icon-units.svg'
import iconDropdown from '../../../public/images/icon-dropdown.svg'
import iconCheckmark from '../../../public/images/icon-checkmark.svg'
import logo from '../../../public/images/logo.svg'

let alternancia = {
  temperatura: 'celcius',
  velocidade: 'km',
  volume: 'millimetros'
 }
const Menu = ({setState})=> {
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
  const mudarAlternancia = (id) => {
    if(id === "celcius" || id === "fahrenheit"){
      if(id === "celcius"){
        let alterarClassFahrenheit = document.getElementById('fahrenheit')
        alterarClassFahrenheit.classList.remove('item-ativo')
        alterarClassFahrenheit.classList.add('item-desativado')
        let alternaSelection = document.getElementById(id)
        alternaSelection.classList.add('item-ativo')
        alternaSelection.classList.remove('item-desativado')
        alternancia.temperatura = alternaSelection.id

      } else if (id === "fahrenheit") {
        let alterarClassCelcius = document.getElementById('celcius')
        alterarClassCelcius.classList.remove('item-ativo')
        alterarClassCelcius.classList.add('item-desativado')
        let alternaSelection = document.getElementById(id)
        alternaSelection.classList.add('item-ativo')
        alternaSelection.classList.remove('item-desativado')
        alternancia.temperatura = alternaSelection.id
      }
      
    } else if (id === "km" || id === "mph"){
      if(id === "km"){
        let alterarClassFahrenheit = document.getElementById('mph')
        alterarClassFahrenheit.classList.remove('item-ativo')
        alterarClassFahrenheit.classList.add('item-desativado')
        let alternaSelection = document.getElementById(id)
        alternaSelection.classList.add('item-ativo')
        alternaSelection.classList.remove('item-desativado')
        alternancia.velocidade = alternaSelection.id

      } else if (id === "mph") {
        let alterarClassCelcius = document.getElementById('km')
        alterarClassCelcius.classList.remove('item-ativo')
        alterarClassCelcius.classList.add('item-desativado')
        let alternaSelection = document.getElementById(id)
        alternaSelection.classList.add('item-ativo')
        alternaSelection.classList.remove('item-desativado')
        alternancia.velocidade = alternaSelection.id

      }
    } else if (id === "millimetros" || id === "inches"){
        if(id === "millimetros"){
          let alterarClassFahrenheit = document.getElementById('inches')
          alterarClassFahrenheit.classList.remove('item-ativo')
          alterarClassFahrenheit.classList.add('item-desativado')
          let alternaSelection = document.getElementById(id)
          alternaSelection.classList.add('item-ativo')
          alternaSelection.classList.remove('item-desativado')
          alternancia.volume = alternaSelection.id
          
        } else if (id === "inches") {
          let alterarClassCelcius = document.getElementById('millimetros')
          alterarClassCelcius.classList.remove('item-ativo')
          alterarClassCelcius.classList.add('item-desativado')
          let alternaSelection = document.getElementById(id)
          alternaSelection.classList.add('item-ativo')
          alternaSelection.classList.remove('item-desativado')
          alternancia.volume = alternaSelection.id

        }
    }
    setState(e => ({...e, alternancias: alternancia}))
}
return(
    <section className='cabecalho'>
        <img className='imagem-logo' src={logo} alt="previsao do tempo" />
        <div className='menu'>
            
            <div className='titulo-menu'>
            <img className='icone' src={iconUnits} alt="units" />         
            <p>Units</p>
            <img onClick={ocultarMenu} className='icone' src={iconDropdown} />
            </div>

            <div className='itens ocultar-itens'>
            <div className='item-desativado'>Mudar para Imperial</div>
            <div className='item-desativado titulo-item'>Temperatura</div>
            <div id='celcius' onClick={(e)=>{mudarAlternancia(e.target.id)}} className='item-desativado'>Celsius (°C) <img className='icone' src={iconCheckmark} alt="Icon checkmark" /></div>
            <div id='fahrenheit' onClick={(e)=>{mudarAlternancia(e.target.id)}} className='item-desativado'>Fahrenheit (°F)</div>
            <div className='borda'></div>
            <div className='item-desativado titulo-item'>Wind Speed</div>
            <div id='km' onClick={(e)=>{mudarAlternancia(e.target.id)}} className='item-desativado'>km/h <img className='icone' src={iconCheckmark} alt="Icon checkmark" /></div>
            <div id='mph' onClick={(e)=>{mudarAlternancia(e.target.id)}} className='item-desativado'>mph</div>
            <div className='borda'></div>
            <div className='item-desativado titulo-item'>Precipitation</div>
            <div id='millimetros' onClick={(e)=>{mudarAlternancia(e.target.id)}} className='item-desativado' >Millimetetros (mm) <img className='icone' src={iconCheckmark} alt="Icon checkmark" /></div>
            <div id='inches' onClick={(e)=>{mudarAlternancia(e.target.id)}} className='item-desativado' >Inches (in)</div>
            </div>
        </div>
    </section>
)}

  export default Menu