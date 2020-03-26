const express = require('express');

const routes = express.Router();

const OngController = require('./Controllers/OngController');
const IncidentController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController')
const SessionController = require('./Controllers/SessionController')

routes.post('/session', SessionController.store)

routes.post('/ongs', OngController.store)
routes.get('/ongs', OngController.index)

routes.post('/incidents', IncidentController.store)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.index)

routes.get('/teste',(req,res)=>{
    return res.send('It Works!');
})

module.exports = routes