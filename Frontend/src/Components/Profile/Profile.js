import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import API from '../../services/API'

import './Profile.css'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId')
    const history = useHistory();

    const [incidents, setIncidents] = useState([])

    useEffect(()=>{
        async function LoadProfile(){
            const response = await API.get('/profile',{
                headers:{
                    auth: ongId
                }
            })
            setIncidents(response.data)
        }

        LoadProfile()
    },[])

    async function handleDeleteIncident(id){
        try{
            await API.delete(`/incidents/${id}`,{
                headers: {
                    auth: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))

        }catch(e){
            alert(e)
        }
    }

    function handleLogout(){
        localStorage.clear();
    
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span> Bem vinda, {ongName} </span>
            
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1> Casos Cadastrados </h1>
            
            <ul>
                {incidents.map((incident)=>(
                    <li key={incident.id}>
                        <strong>Caso: </strong>
                        <p> {incident.title} </p>
                    
                        <strong> Descrição: </strong>
                        <p> {incident.description} </p>

                        <strong> Valor: </strong>
                        <p> {Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)} </p>

                        <button onClick = {() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a823"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}