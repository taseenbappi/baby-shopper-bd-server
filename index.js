const express = require('express')
const cors = require("cors");
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = process.env.PORT || 5000;

// midleware
app.use(cors())
app.use(express.json());


// mongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wyglv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("babyShopperDB");
        const toysCollection = database.collection("toys");

        // all toys api
        app.get('/toys', async (req, res) => {
            const cursor = toysCollection.find({});
            const result = await cursor.toArray();
            res.json(result);

        })
        // find by id
        app.get('/toys/:id', async (req, res) => {
            const toyId = req.params.id;
            const id = { _id: ObjectId(toyId) }
            const result = await toysCollection.findOne(id);
            res.json(result);

        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


// root api
app.get('/', (req, res) => {
    res.send('BabyShoper Server is ON!!')
})

// port listener
app.listen(port, () => {
    console.log(`listening at:${port}`);
})