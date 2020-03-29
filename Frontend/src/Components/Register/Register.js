import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import API from '../../services/API'

import "./Register.css"
import logoImg from '../../assets/logo.svg'

export default function Register(){
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUf] = useState("")
    const history = useHistory()

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf
        }

        try{
            const response = await API.post('/ongs', data)

            alert('cadastro feito com sucesso!')

            history.push('/')
        }catch(e){
            alert(e)
        }
        
    }
    
    return(
        <div className="register-container">
            <div className="content">
                <section>    
                    <img src={logoImg} alt="Be The Hero"/>
                
                    <h1>Cadastro</h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude as pessoas
                        a encontrarem os casos da sua ONG.
                    </p>

                    <Link className=".back-link" to="/"> 
                        <FiArrowLeft LogIn size={16} color="#E02041"/>
                        Não tenho cadastro 
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da ONG"/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"/>
                    <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="Whatsapp"/>

                    <div className="input-group">
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cidade"/>
                        <input value={uf} onChange={(e) => setUf(e.target.value)} placeholder="UF" style={{width: 80}}/>
                    </div>

                    <button type="submit" className="button"> Cadastrar </button>
                </form>
            </div>
        </div>
    )
}