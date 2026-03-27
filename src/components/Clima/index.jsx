import "./style.css"
import iconSunny from "../../../public/images/icon-sunny.webp"
import iconOvercast from "../../../public/images/icon-overcast.webp"
import iconSnow from "../../../public/images/icon-snow.webp"
import iconStorm from "../../../public/images/icon-storm.webp"
import iconCloudy from "../../../public/images/icon-partly-cloudy.webp"
import iconRain from "../../../public/images/icon-rain.webp"
import iconDrizzle from "../../../public/images/icon-drizzle.webp"
import iconFog from "../../../public/images/icon-fog.webp"
import iconError from "../../../public/images/icon-error.svg"
import bgTodaySmall from "../../../public/images/bg-today-small.svg"
import bgTodayLarge from "../../../public/images/bg-today-large.svg"

export const Clima = (dados) => {
    console.log(dados)
    // const dia1 = dados.dados.previsao7Dias.dia1.temperaturaMaxima
    function getIconeTempo() {
        let caminho = ''
        if (dados.dados.dados.descricao === 'céu limpo' || 'Principalmente limpo') {
            caminho = iconSunny
        } else if (dados.dados.dados.descricao === 'nublado' || 'Parcialmente nublado' || 'Nevoeiro') {
            caminho = iconOvercast
        } else if (dados.dados.dados.descricao === 'neve' || 'Geada/Nevoeiro congelante') {
            caminho = iconSnow
        } else if (dados.dados.dados.descricao === 'tempestade' || dados.dados.dados.descricao === 'chuva forte' || dados.dados.dados.descricao === 'trovoadas' || 'Chuva forte' || 'Pancadas de chuva' || 'Fortes Pancadas de chuva' || 'Trovoada' || 'Trovoada com granizo leve' || 'Trovoada com granizo forte') {
            caminho = iconStorm
        } else if (dados.dados.dados.descricao === 'nuven-sol') {
            caminho = iconCloudy
        } else if (dados.dados.dados.descricao === 'chuva leve' || 'Garoa' || 'Garoa leve' || 'Garoa forte') {
            caminho = iconRain
        } else if (dados.dados.dados.descricao === "chuva moderada" || "Chuva") {
            caminho = iconDrizzle
        } else if (dados.dados.dados.descricao === "nuvens dispersas" || dados.dados.dados.descricao === "algumas nuvens" || '') {
            caminho = iconFog
        }
        return caminho
    }
    function getData7Dias(dataDia){
        let minhaData= new Date(dataDia);
        const dia =  minhaData.toLocaleDateString('pt-br', {weekday: 'short'});
        return dia
    }

    function getData() {
        const data = new Date()
        const opcoes = {
            weekday: "long",
            year: 'numeric',
            month: "long",
            day: 'numeric'
        }

        const dataFormatada = data.toLocaleDateString('pr-BR', opcoes)
        return dataFormatada
    }
    function converterTemperatura(){
        if(dados.dados.alternancias.temperatura === "celcius" || dados.dados.alternancias.temperatura === undefined){
            const resultTemperatura = dados.dados.dados.temperatura
            const resultSensacaoTermica = dados.dados.dados.sensacaoTermica
            return {resultTemperatura, resultSensacaoTermica}  
        } else if (dados.dados.alternancias.temperatura === "fahrenheit"){
            const resultTemperatura = (dados.dados.dados.temperatura * 1.8) + 32;
            const resultSensacaoTermica = (dados.dados.dados.sensacaoTermica * 1.8) + 32;
            return {resultTemperatura, resultSensacaoTermica}
        }
    }
    function converterVelocidade(){
         if(dados.dados.alternancias.velocidade === "km" || dados.dados.alternancias.velocidade === undefined){
            const result = dados.dados.dados.wind
            return {result, medida: 'Km/h'} 
        } else if (dados.dados.alternancias.velocidade === "mph"){
            const result = dados.dados.dados.wind * 0.621371;
            return {result, medida: 'mph'}
        }
    }
    function converteVolume(){
        if(dados.dados.alternancias.volume === "millimetros" || dados.dados.alternancias.volume === undefined){
            return 'mm'
        } else if (dados.dados.alternancias.volume === "inches"){
            return 'in'
        }
    }
   
    const dataHoje = getData()
    let caminho = getIconeTempo()
    let temperatura = converterTemperatura()
    let velocidade = converterVelocidade()
    let volume = converteVolume()
    
    if (dados.dados.dados == ""){
        return (
            <section className="page-error">
                <img src={iconError} alt="icone de Error" />
                <p className="titulo">Sem Local definido!</p>
                <p>Realize uma busca agora mesmo.</p>
            </section>
        )
        
    } else {
            return (
            <section className="clima">
                <div className="locais-e-detalhes">
                <picture>
                    <source className="imagem-pequena" srcset={bgTodaySmall} media="(max-width: 600px)" />
                    <img src={bgTodayLarge} alt="imagem de fundo grande" />
                </picture>
                    <div className="dados-local">
                        <div className="info-regiao">
                            <p className="cidade">{dados.dados.dados.nome}, {dados.dados.dados.bandeira}</p>
                            <p>{dataHoje}</p>
                        </div>
                        <div className="icon-e-temperadura">
                            <img className="emoji-clima" src={caminho} alt="emoji do clima" />
                            <p className="temperatura-atual">{Math.round(temperatura.resultTemperatura)}°</p>
                        </div>
                    </div>

                    <div className="dados-quantitativos">
                        <div className="quantidades">
                            <p>Sensação Térmica</p>
                            <p>{Math.round(temperatura.resultSensacaoTermica)}°</p>
                        </div>
                        <div className="quantidades">
                            <p>Umidade</p>
                            <p>{dados.dados.dados.umidade}%</p>
                        </div>
                        <div className="quantidades">
                            <p>Distância</p>
                            <p>{Math.round(velocidade.result)} {velocidade.medida}</p>
                        </div>
                        <div className="quantidades">
                            <p>Precipitação</p>
                            <p>0 {volume}</p>
                        </div>
                    </div>
                    <div className="previsao-diaria">
                            { !dados.dados.previsao7Dias ? '':(
                                <>
                                <p>Previsão Diária</p>
                                <div className="dias">
                                    
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia1.dia)}</p>
                                            <span>imagem</span>
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia1.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia1.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia2.dia)}</p>
                                            <span>imagem</span>
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia2.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia2.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia3.dia)}</p>
                                            <span>imagem</span>
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia3.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia3.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia4.dia)}</p>
                                            <span>imagem</span>
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia4.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia4.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia5.dia)}</p>
                                            <span>imagem</span>
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia5.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia5.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia6.dia)}</p>
                                            <span>imagem</span>
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia6.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia6.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia7.dia)}</p>
                                            <span>imagem</span>
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia7.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia7.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>   
                                    </div>
                                </>
                                
                                )
                               
                            }
                        
                    </div>
                </div>

                <div className="horarios-e-dias">
                    wefwe
                </div>
            </section>
        )
    }

    
}