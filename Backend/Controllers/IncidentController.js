const express = require('express');

const connection = require('../Database/connection');

module.exports = {
    async store(req,res){
        const { title, description, value } = req.body
        const ong_id = req.headers.auth;

        const [id] = await connection('incidents').insert({
            ong_id,
            title,
            description,
            value
        })

        return res.json({id, title})
    },

    async index(req,res){
        const result = await connection('incidents').select('*');

        return res.json(result);
    },
    
    async delete(req,res){
        const { id } = req.params;
        const ong_id = req.headers.auth;

        const incident = await connection('incidents')
                               .where('id',id)
                               .select('ong_id')
                               .first();

        if(incident.ong_id != ong_id){
            return res.status(401).json({error: 'Operação não autorizada!'});
        }

        await connection('incidents').where('id',id).delete();

        return res.status(204).send();
    }
}