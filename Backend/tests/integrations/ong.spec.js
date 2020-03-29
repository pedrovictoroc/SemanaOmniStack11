const request = require('supertest')
const app = require('../../app')
const connection = require('../../Database/connection')
describe('ONG', ()=>{
    beforeEach(async()=>{
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async ()=>{
        await connection.destroy()
    })

    it('should be able to create a new ONG', async ()=>{
        const response = await request(app)
        .post('/ongs')
        .send({
            nome: "supertest",
            email: "supertest@gmail.com",
            whatsapp: "1234567812",
            city: 'fortaleza',
            uf: "ce"
        })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8)
    })
})