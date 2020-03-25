const express = require('express');

const connection = require('../Database/connection');

module.exports = {
    async index(req,res){
        const ong_id = req.headers.auth

        const result = await connection('incidents').where('ong_id', ong_id).select('*')
        
        return res.json(result)
    }
}