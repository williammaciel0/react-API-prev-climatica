import "./style.css"

export const Clima = (dados) => {
    console.log(dados)
    function getIconeTempo() {
        let caminho = ''
        if (dados.dados.descricao === 'céu limpo') {
            caminho = '../../../public/images/icon-sunny.webp'
        } else if (dados.dados.descricao === 'nublado') {
            caminho = '../../../public/images/icon-overcast.webp'
        } else if (dados.dados.descricao === 'neve') {
            caminho = '../../../public/images/icon-snow.webp'
        } else if (dados.dados.descricao === 'tempestade') {
            caminho = '../../../public/images/icon-storm.webp'
        } else if (dados.dados.descricao === 'nuven-sol') {
            caminho = '../../../public/images/icon-patly-cloudy.webp'
        } else if (dados.dados.descricao === 'chuva leve') {
            caminho = '../../../public/images/icon-rain.webp'
        } else if (dados.dados.descricao === "chuva moderada") {
            caminho = '../../../public/images/icon-drizzle.webp'
        } else if (dados.dados.descricao === "nuvens dispersas" || dados.dados.descricao === "algumas nuvens") {
            caminho = '../../../public/images/icon-fog.webp'
        }
        return caminho
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
    
    const dataHoje = getData()
    let caminho = getIconeTempo()

    if (dados.dados == ""){
        console.log("vazio") 
        return (
            <section className="page-error">
                <img src="../../../public/images/icon-error.svg" alt="" />
                <p className="titulo">Algo deu errado!</p>
                <p>Não foi possível conectar ao servidor (erro de API). Tente novamente em alguns instantes.</p>
            </section>
        )
        
    } else {
            return (
            <section className="clima">
                <div className="locais-e-detalhes">
                <picture>
                    <source className="imagem-pequena" srcset="../../../public/images/bg-today-small.svg" media="(max-width: 600px)" />
                    <img src="../../../public/images/bg-today-large.svg" alt="" />
                </picture>
                    <div className="dados-local">
                        <div className="info-regiao">
                            <p>{dados.dados.nome}, {dados.dados.bandeira}</p>
                            <p>{dataHoje}</p>
                        </div>
                        <div className="icon-e-temperadura">
                            <img className="emoji-clima" src={caminho} alt="emoji do clima" />
                            <p className="temperatura-atual">{Math.round(dados.dados.temperatura)}°</p>
                        </div>
                    </div>

                    <div className="dados-quantitativos">
                        <div className="quantidades">
                            <p>Sensação Térmica</p>
                            <p>{Math.round(dados.dados.sensacaoTermica)}°</p>
                        </div>
                        <div className="quantidades">
                            <p>Umidade</p>
                            <p>{dados.dados.umidade}%</p>
                        </div>
                        <div className="quantidades">
                            <p>Distância</p>
                            <p>{dados.dados.wind} km/h</p>
                        </div>
                        <div className="quantidades">
                            <p>Precipitação</p>
                            <p>0 mm</p>
                        </div>
                    </div>
                    <div className="previsao-diaria">
                        <p>Previsão Diária</p>
                        <div className="dias">
                            <div className="dia">
                                <p>Tue</p>
                                <span>imagem</span>
                                <div className="percentual">
                                    <p>20°</p>
                                    <p>14°</p>
                                </div>
                            </div>
                            <div className="dia">
                                <p>Tue</p>
                                <span>imagem</span>
                                <div className="percentual">
                                    <p>20°</p>
                                    <p>14°</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="horarios-e-dias">
                    wefwe
                </div>
            </section>
        )
    }

    
}