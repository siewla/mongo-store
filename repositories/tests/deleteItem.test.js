const { storeRepositories } = require('../store');
const db                    = require('../../database');

describe('storeRepositories.deleteItem', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return delete the items with the name \'cupcakes\'', async () => {
        const result = await storeRepositories.deleteItem('cupcakes');
        expect(result).toBeGreaterThan(0);
    });

});