const express = require('express');

const crypto = require('crypto')
const connection = require('../Database/connection');

const generateUniqueID = require('../utils/generateUniqueID')

module.exports = {
    async store(req,res){
        const { nome, email, whatsapp, city, uf } = req.body

        const id = generateUniqueID()

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf
        });

        return res.json({ id })
    },

    async index(req,res){
        const ongs = await connection('ongs').select('*');

        return res.json(ongs)
    }
}