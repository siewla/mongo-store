const { storeRepositories } = require('../store');
const db                    = require('../../database');
describe('storeRepositories.getAll', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return an array', async () => {
        const storeItems = await storeRepositories.getAll();
        expect(storeItems).toBeInstanceOf(Array);
        //expect(typeof(storeItems)).toBe('Object');
    });

    it('should return an array of store items, one of the items should be beans', async () => {
        const storeItems = await storeRepositories.getAll();
        const beans = storeItems.find(item => item.name === 'Beans');
        expect(beans.name).toBe('Beans');
    });

    it('should return more than 0 item', async () => {
        const storeItems = await storeRepositories.getAll();
        expect(storeItems.length).toBeGreaterThan(0);
    });
});