// KEY: 
import { useState } from "react";
import "./style.css"

export const Buscador = ({ getInformacoes }) => {
    const keyAPI = '9e9185986bb9c73b4f3deb63c2b215b0'

    async function chamadaDaAPITempo(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}&units=metric&lang=pt_br`
        const response = await fetch(url)
        return await response.json()
    }

    const [cidade, setCidade] = useState('')

    const getCidade = (event) => {
        event.preventDefault()
        if (cidade !== '') {
            const data = chamadaDaAPITempo(cidade)
            console.log(data)
            data.then((data) => {
                const umidade = data['main'].humidity
                const temperatura = data['main'].temp
                const sensacaoTermica = data['main'].feels_like
                const wind = data['wind'].speed
                const descricao = data['weather'][0].description
                const nome = data['name']
                const bandeira = data['sys'].country
                const result = { nome, umidade, temperatura, sensacaoTermica, wind, descricao, bandeira }
                getInformacoes(result)
            });

        } else {
            // const classeBuscador = document.querySelector('.buscador')
            // classeBuscador.innerHTML = `<p Insira uma cidade!</p>`
            alert('Insira uma cidade!')
        }
    }

    return (
        <section className="buscador">
            <h1>Como está o clima hoje?</h1>
            <div className="input-busca-clima">
                <form onSubmit={getCidade}>
                    <div className="input-img">
                        <div className="lupa">
                            <img src="../../../public/images/icon-search.svg" alt="" />
                        </div>
                        <input
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            placeholder="Busque um local..." />
                    </div>

                    <button type="submit">Enviar</button>
                </form>
            </div>
        </section>

    )
}