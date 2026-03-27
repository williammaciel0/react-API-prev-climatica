import { useState } from "react";
import "./style.css"

import iconSearch from "../../../public/images/icon-search.svg"

export const Buscador = ({ setState }) => {

    async function getAPI7Days(latitude, longitude) {
        const urlOpenMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=America%2FSao_Paulo`;
        const response = await fetch(urlOpenMeteo)
        const data = await response.json()
        console.log(data)
        return data
    }

         
    async function chamadaDaAPITempo(city) {
        const keyAPI = '9e9185986bb9c73b4f3deb63c2b215b0' 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}&units=metric&lang=pt_br`
        const response = await fetch(url)
        return await response.json()
    }

    const [cidade, setCidade] = useState('')

    const getCidade = (event) => {
        event.preventDefault()
        if (cidade !== '') {
            const data = chamadaDaAPITempo(cidade)

            data.then((data) => {
                const umidade = data['main'].humidity
                const temperatura = data['main'].temp
                const sensacaoTermica = data['main'].feels_like
                const wind = data['wind'].speed
                const descricao = data['weather'][0].description
                const nome = data['name']
                const bandeira = data['sys'].country
                const latitude = data['coord'].lat
                const longitude = data['coord'].lon

                const previsao7Dias = getAPI7Days(latitude, longitude)
                previsao7Dias.then((data) => {
                    
                    const objeto7dias = {
                        dia1: {
                            dia: data['daily'].time[0],
                            temperaturaMaxima: data['daily'].temperature_2m_max[0],
                            temperaturaMinima: data['daily'].temperature_2m_min[0],
                            descricao: data['daily'].weathercode[0]
                        },
                        dia2: {
                            dia: data['daily'].time[1],
                            temperaturaMaxima: data['daily'].temperature_2m_max[1],
                            temperaturaMinima: data['daily'].temperature_2m_min[1]
                        },
                         dia3: {
                            dia: data['daily'].time[2],
                            temperaturaMaxima: data['daily'].temperature_2m_max[2],
                            temperaturaMinima: data['daily'].temperature_2m_min[2]
                        },
                         dia4: {
                            dia: data['daily'].time[3],
                            temperaturaMaxima: data['daily'].temperature_2m_max[3],
                            temperaturaMinima: data['daily'].temperature_2m_min[3]
                        },
                         dia5: {
                            dia: data['daily'].time[4],
                            temperaturaMaxima: data['daily'].temperature_2m_max[4],
                            temperaturaMinima: data['daily'].temperature_2m_min[4]
                        },
                         dia6: {
                            dia: data['daily'].time[5],
                            temperaturaMaxima: data['daily'].temperature_2m_max[5],
                            temperaturaMinima: data['daily'].temperature_2m_min[5]
                        },
                         dia7: {
                            dia: data['daily'].time[6],
                            temperaturaMaxima: data['daily'].temperature_2m_max[6],
                            temperaturaMinima: data['daily'].temperature_2m_min[6]
                        },
                    }
                    setState(e => ({...e, previsao7Dias: objeto7dias}))
                    
                })
                const result = { nome, umidade, temperatura, sensacaoTermica, wind, descricao, bandeira, latitude, longitude}
                setState(e => ({...e, dados: result}))
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
                            <img src={iconSearch} alt="icon luta" />
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