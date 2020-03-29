import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

import API from '../../services/API'

import { FiLogIn } from 'react-icons/fi'
import './Logon.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon(){
    const [id, setId] = useState("")
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            
            const response = await API.post('/session', { id })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.nome)

            history.push('/profile')
        }catch(e){
            alert(e)
        }

    }

    return(
        <>
            <div className="logon-container">
                <section className="form">
                    <img src={logoImg} alt="Be The Hero"/>
            
                    <form onSubmit={handleLogin}>
                        <h1> Faça seu logon </h1>

                        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Sua ID"/>

                        <button className="button" type="submit"> Entrar </button>
                    
                        <Link className="back-link" to="/register"> 
                            <FiLogIn size={16} color="#E02041"/>
                            Não tenho cadastro 
                        </Link>
                    </form>
                </section>

                <img src={heroesImg} alt="Imagem com pessoas desenhadas no estilo cartoon abraçadas"/>
            </div>
        </>
    )
}