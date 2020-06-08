/*------------ MONGO DEPENDENCIES ------------*/
const MongoClient   = require('mongodb').MongoClient;

/*------------ GLOBAL CONFIGURATION ------------*/
const MONGO_URL     = process.env.MONGODB_URI || 'mongodb://localhost:27017';

/*------------ DATABASE NAME ------------*/
const dbName        = process.env.DB_NAME || 'mongostore';

/*------------ Collections ------------*/
const COLLECTIONS = {
    ITEM: 'item'
};

/*------------ Create a new MongoClient------------*/
const client        = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

module.exports = {
    async connect (){
        const connection = await client.connect();
        console.log('Connected to MongoDB');
        const db = connection.db(dbName);
        this.item = db.collection(COLLECTIONS.ITEM);
    },

    disconnect () {
        return client.close();
    }
};