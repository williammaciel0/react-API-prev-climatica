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
    console.log(dados.dados.previsaoProximasHoras)
    const previsaoPorHora = dados.dados.previsaoProximasHoras
    function getIconeTempo(iconReferencia) {
        let caminho = ''
        if (iconReferencia === 'céu limpo' || iconReferencia === 'Principalmente limpo') {
            caminho = iconSunny
        } else if (iconReferencia === 'nublado' || iconReferencia === 'Parcialmente nublado' || iconReferencia === 'Nevoeiro' || iconReferencia === 'Nublado' ) {
            caminho = iconOvercast
        } else if (iconReferencia === 'neve' || iconReferencia === 'Neve' || iconReferencia === 'Geada/Nevoeiro congelante') {
            caminho = iconSnow
        } else if (iconReferencia === 'tempestade' || iconReferencia === 'chuva forte' || iconReferencia === 'trovoadas' || iconReferencia === 'Chuva forte' || iconReferencia === 'Pancadas de chuva' || iconReferencia === 'Fortes Pancadas de chuva' || iconReferencia === 'Trovoada' || iconReferencia === 'Trovoada com granizo leve' || iconReferencia === 'Trovoada com granizo forte') {
            caminho = iconStorm
        } else if (iconReferencia === 'nuven-sol') {
            caminho = iconCloudy
        } else if (iconReferencia === 'chuva leve' || iconReferencia === 'Garoa' || iconReferencia === 'Chuva leve (pancadas)' || iconReferencia === 'Garoa leve' || iconReferencia === 'Garoa forte' || iconReferencia ==='Chuva leve') {
            caminho = iconRain
        } else if (iconReferencia === "chuva moderada" || iconReferencia === "Chuva") {
            caminho = iconDrizzle
        } else if (iconReferencia === "nuvens dispersas" || iconReferencia === "algumas nuvens") {
            caminho = iconFog
        } else {
            caminho = iconError
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
                    <div className="dados-local">
                        <div className="info-regiao">
                            <p className="cidade">{dados.dados.dados.nome}, {dados.dados.dados.bandeira}</p>
                            <p>{dataHoje}</p>
                        </div>
                        <div className="icon-e-temperadura">
                            <img className="emoji-clima" src={getIconeTempo(dados.dados.dados.descricao)} alt="emoji do clima" />
                            <p className="temperatura-atual">{Math.round(temperatura.resultTemperatura)}°</p>
                        </div>
                    </div>
                    <source className="imagem-pequena" srcset={bgTodaySmall} media="(max-width: 600px)" />
                    <img src={bgTodayLarge} alt="imagem de fundo grande" />
                </picture>
                    

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
                                            <img  className="icon7Dias" src={getIconeTempo(dados.dados.previsao7Dias.dia1.descricao)} alt="emoji do clima" />
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia1.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia1.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia2.dia)}</p>
                                            <img  className="icon7Dias" src={getIconeTempo(dados.dados.previsao7Dias.dia2.descricao)} alt="emoji do clima" />
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia2.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia2.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia3.dia)}</p>
                                            <img  className="icon7Dias" src={getIconeTempo(dados.dados.previsao7Dias.dia3.descricao)} alt="emoji do clima" />
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia3.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia3.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia4.dia)}</p>
                                            <img  className="icon7Dias" src={getIconeTempo(dados.dados.previsao7Dias.dia4.descricao)} alt="emoji do clima" />
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia4.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia4.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia5.dia)}</p>
                                            <img  className="icon7Dias" src={getIconeTempo(dados.dados.previsao7Dias.dia5.descricao)} alt="emoji do clima" />
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia5.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia5.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia6.dia)}</p>
                                            <img  className="icon7Dias" src={getIconeTempo(dados.dados.previsao7Dias.dia6.descricao)} alt="emoji do clima" />
                                            <div className="percentual">
                                                <p>{Math.round(dados.dados.previsao7Dias.dia6.temperaturaMaxima)}°</p>
                                                <p>{Math.round(dados.dados.previsao7Dias.dia6.temperaturaMinima)}°</p> 
                                            </div>
                                        </div>
                                        <div className="dia">
                                            <p>{getData7Dias(dados.dados.previsao7Dias.dia7.dia)}</p>
                                           <img  className="icon7Dias" src={getIconeTempo(dados.dados.previsao7Dias.dia7.descricao)} alt="emoji do clima" />
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

                <div className="horarios">
                    {previsaoPorHora && previsaoPorHora.length > 0 ? (
                        previsaoPorHora.slice(0, 24).map((horaData, index) => {
                            const hora = new Date(horaData.hora).getHours();
                            const descricao = horaData.descricao;
                            return (
                                <div key={index} className="hora">
                                    <div className="informacoes">
                                        <img style={{ width: '20px' }} src={getIconeTempo(descricao)} alt={descricao} />
                                        <p>{hora} PM</p>
                                    </div>
                                    <p>{Math.round(horaData.temperatura)}°</p>
                                </div>
                            );
                        })
                    ) : (
                        <div className="hora">
                            <div className="informacoes">
                                <img src={iconError} alt="" />
                                <p>Carregando...</p>
                            </div>
                            <p>--°</p>
                        </div>
                    )}
                </div>
            </section>
        )
    }

    
}