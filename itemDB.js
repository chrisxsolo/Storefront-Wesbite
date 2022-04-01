const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('Listening to port 3000'));

const database = new Datastore('items.db');
database.loadDatabase();
const database1 = new Datastore('signup.db');
database1.loadDatabase();

app.use(express.static('./'));
app.use(express.json());
app.get('/allItems', (request, response) => {
    database.find({}, (err, items) => {
        if (err){
            console.log(err);
        } else {
            response.json(items);
        }
    });
});
app.post('/oneItem', (request, response) => {
    database.findOne({item:request.body.itm}, (err, item) => {
        if (err){
            console.log(err);
        } else {
            response.json(item);
        }
    });
});


app.post('/api', (request, response) => {
  const data = request.body;
  database.insert(data);
  response.json(data);
});
