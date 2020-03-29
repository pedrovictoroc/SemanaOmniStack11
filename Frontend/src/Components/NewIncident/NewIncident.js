import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'

import API from '../../services/API'

import './NewIncident.css'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

export default function NewIncident(){
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        
        const data = {
            title,
            description,
            value
        }

        try{
            await API.post('/incidents', data, {
                headers:{
                    auth: ongId
                }
            })

            history.push('/profile')

        }catch(e){
            alert(e)
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>    
                    <img src={logoImg} alt="Be The Hero"/>
                
                    <h1>Cadastrar novo caso</h1>
                    <p> Descreva o caso detalhadamente para encontrar
                        um herói para resolver isso.
                    </p>

                    <Link className=".back-link" to="/profile"> 
                        <FiArrowLeft LogIn size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Titulo do caso"/>
                    <textarea value ={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição"/>
                    <input value={value} onChange={(e)=> setValue(e.target.value)} placeholder="Valor em reais"/>

                    <button type="submit" className="button"> Cadastrar </button>
                </form>
            </div>
        </div>
    )
}