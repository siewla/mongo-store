const { storeRepositories } = require('../store');
const db                    = require('../../database');
describe('storeRepositories.getItemByName', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return one object item, the item name to be \'bean\'', async () => {
        const beans = await storeRepositories.getItemByName('Beans');
        expect(beans.name).toBe('Beans');
        expect(typeof(beans)).toBe('object');
    });

    it('should return one store item for query name \'beans\' ignoring case', async () => {
        const beans = await storeRepositories.getItemByName('beans');
        expect(beans.name).toBe('Beans');
    });

    it('should return an error if query name is \'pencil\'', async () => {
        try{
            await storeRepositories.getItemByName('pencil');
        } catch (err) {
            expect(err.message).toBe('Item not found');
        }
    });

});
