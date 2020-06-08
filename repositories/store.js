const db = require('../database');

const storeRepositories = {
    getAll: () => {
        return db.item.find()
            .toArray();
    },

    getItemByName: async (name) =>{
        const item = await db.item
            .findOne({ name: 
                { '$regex': `^${name}$`, 
                    $options:'i' } 
            });
        
        if (!item) {
            throw new Error('Item not found');
        }
        
        return item;
    },

    createItem: async (itemObj) => {
        try {
            if (Object.keys(itemObj).length){
                const { insertedCount } = await db.item.insertOne(itemObj);
                if (!insertedCount) {
                    throw new Error('Insertion failed');
                } else {
                    return true;
                }
            } else {
                throw new Error('empty object');
            }
            
        } catch (err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item, ${JSON.stringify(itemObj)}`);
        }
    },

    deleteItem: async (name) => {
        const { result } = await db.item.deleteMany({ name: 
            { '$regex': `^${name}$`, 
                $options:'i' } 
        });
        if (!result.n) {
            throw new Error('Item not found');
        } else {
            return result.n;
        }
    },

    updateItemByName: async (name, updatedData) =>{
        try {
            const { matchedCount } = await db.item.updateOne(
                {
                    name: 
                    { '$regex': `^${name}$`, 
                        $options:'i' }
                }, 
                {
                    $set: updatedData
                });
            if (!matchedCount){
                throw new Error(`${name} does not exist`);
            } else {
                return true;
            }
        } catch (err) {
            throw new Error(`Due to ${err.message},the items can't be updated with ${JSON.stringify(updatedData)}`);
        }
    } 
        
};

module.exports = {
    storeRepositories
};