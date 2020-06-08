const { storeRepositories } = require('../store');
const db                    = require('../../database');

describe('storeRepositories.createItem', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return insertedCount when insert a new item into db connection', async () => {
        const newItem = await storeRepositories.createItem({ 
            'name': 'Cupcakes',
            'description': 'A delicious cup cake made a handsome man',
            'img': 'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg',
            'price': 200,
            'qty': 100
        });
        expect(newItem).toBe(true);
        const newItemName = await storeRepositories.getItemByName('Cupcakes');
        expect(newItemName.name).toBe('Cupcakes');
    });

    // it('should return error when empty {} is passed', async () => {
    //     const newItem = await storeRepositories.createItem({});
    //     expect(newItem).toThrowError('Due to empty object, you are not allowed to insert this item, {}');
    // });
});