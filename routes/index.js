const { storeControllers } = require('../controllers');

module.exports = (app) => {
    app.get('/', storeControllers.getAll); //index route (1)
    app.get('/new', storeControllers.createNew); // new item form route (4)
    app.get('/:name', storeControllers.getItemByName); // show route (2)
    app.post('/create', storeControllers.createItem);//create route - add new item to mongoDB (3)
    app.delete('/:name', storeControllers.deleteItem); //delete route (5)
    app.put('/:name', storeControllers.updateItem); //update route (6)
    app.get('/:name/edit',storeControllers.editItem); //edit route(7)
};