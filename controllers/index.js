const { storeRepositories } = require('../repositories/store');

const storeControllers = {
    getAll: async (req, res) =>{
        const data = await storeRepositories.getAll();
        res.render('store/indextable', { data });
    },

    getItemByName: async (req, res) => {
        try{
            const item = await storeRepositories.getItemByName(req.params.name);
            return res.render('store/show', { item });
        } catch (err) {
            return res.send(err.message);
        }
    },

    createItem : async (req, res) => {
        try {
            if (Object.keys(req.body).length){
                const item = {
                    'name': req.body.name,
                    'description': req.body.description,
                    'img': req.body.img,
                    'price':parseInt(req.body.price),
                    'qty': parseInt(req.body.qty)
                };
                await storeRepositories.createItem(item);
                //return res.send(item);
                return res.redirect('/');
            } else{
                return res.send('Empty Object');
            }     
        } catch (err) {
            return res.send(err.message);
        }
    },

    createNew : async (req, res) => {
        res.render('store/new');
    },

    deleteItem : async (req, res) => {
        try {
            await storeRepositories.deleteItem(req.params.name);
            return res.redirect('/');
        } catch (err) {
            return res.send(err.message);
        }
    },

    updateItem : async (req, res) => {
        try {
            const name = req.params.name;
            if (Object.keys(req.body).length){
                const item = {
                    'name': req.body.name,
                    'description': req.body.description,
                    'img': req.body.img,
                    'price':parseInt(req.body.price),
                    'qty': parseInt(req.body.qty)
                };
                await storeRepositories.updateItemByName(name,item);
                // return res.send('updated');
                return res.redirect('/');
            } else{
                return res.send('Empty Object');
            }     
        } catch (err) {
            return res.send(err.message);
        }
    },

    editItem : async (req, res) => {
        const item = await storeRepositories.getItemByName(req.params.name);
        return res.render('store/edit.ejs', { item });
    }
};

module.exports = {
    storeControllers
};