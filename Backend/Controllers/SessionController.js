const express = require('express');

const connection = require('../Database/connection');

module.exports = {
    async store(req,res){
        const { id } = req.body;

        const ong = await connection('ongs').where('id', id).select('nome').first();

        if(!ong){
            return res.status(400).json({error: 'Ong não encontrada'})
        }

        return res.json(ong)
    }
}