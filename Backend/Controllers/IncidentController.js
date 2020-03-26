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
        const { page = 1 } = req.query

        const [count] = await connection('incidents').count();

        const result = await connection('incidents')
                             .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                             .limit(5)
                             .offset((page-1)*5)
                             .select(['incidents.*',
                                      'ongs.nome',
                                      'ongs.email',
                                      'ongs.whatsapp',
                                      'ongs.city',
                                      'ongs.uf']);

        res.header('X-Total-Count', count['count(*)'])

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