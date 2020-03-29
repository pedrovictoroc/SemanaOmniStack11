const express = require('express');

//Lib de validação
const { celebrate, Segments, Joi } = require('celebrate')

const routes = express.Router();

const OngController = require('./Controllers/OngController');
const IncidentController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController')
const SessionController = require('./Controllers/SessionController')

routes.post('/session', SessionController.store)

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}),OngController.store)

routes.post('/incidents',IncidentController.store)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}) ,IncidentController.index)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete)

routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        auth: Joi.string().required()
    }).unknown()
}) ,ProfileController.index)

routes.get('/teste',(req,res)=>{
    return res.send('It Works!');
})

module.exports = routes