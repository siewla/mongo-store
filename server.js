/*------------DEPENDENCIES------------*/ 
const express           = require('express');
const methodOverride    = require('method-override');
const app               = express ();
const port              = process.env.PORT || 3000;
const db                = require('./database');

/*------------MIDDLEWARE------------*/ 

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json()); //for parsing application/json 
app.use(express.urlencoded({ extended: false }));

/*------------Route------------*/
/*
app.get('/', async (req, res)=>{
    const item = await db.item.find().toArray();
    res.send(item);
});
*/

require('./routes')(app);

/*------------LISTENER------------*/ 
db.connect().then(()=>{
    app.emit('ready');
});

app.listen(port, () =>{
    console.log(`Mongo store is listening on port : ${port}`);
});