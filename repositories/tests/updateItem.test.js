const { storeRepositories } = require('../store');
const db                    = require('../../database');
describe('storeRepositories.updateItemByName', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return result when updating existing item', async () =>{
        const result = await storeRepositories.updateItemByName('Bones', {
            'name': 'CupCakes',
            'description': 'A delicious cup cake made by a handsome man',
            'img': 'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg',
            'price': 100,
            'qty': 100
        }); 
        expect(result).toBe(true);
    });

    it('should return result when updating existing item', async () =>{
        try {
            const result = await storeRepositories.updateItemByName('Monster', {
                'name': 'CupCakes',
                'description': 'A delicious cup cake made by a handsome man',
                'img': 'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg',
                'price': 100,
                'qty': 100
            }); 
        } catch (err) {
            expect(err.message).toEqual(expect.stringMatching(/^Due/));
        }
        
    });

});