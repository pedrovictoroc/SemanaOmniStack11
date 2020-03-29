const generateUniqueID = require('../../utils/generateUniqueID')

describe('Generate unique id', ()=>{
    it('should generate an unique id', ()=>{
        const id = generateUniqueID()
        
        expect(id).toHaveLength(8)
    })
})