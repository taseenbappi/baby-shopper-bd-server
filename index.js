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
        const orderCollection = database.collection("order_info");
        const usersCollection = database.collection("users");
        const reviewsCollection = database.collection("reviews");

        //-------------Toys api--------------//
        // post a toys api
        app.post('/toys', async (req, res) => {
            const toy = req.body;
            const result = await toysCollection.insertOne(toy);
            res.json(result);
        })
        // all toys api
        app.get('/toys', async (req, res) => {
            const cursor = toysCollection.find({});
            const result = await cursor.toArray();
            res.json(result);

        })
        // delete by toys api
        app.delete('/toys/:id', async (req, res) => {
            const toyId = req.params.id;
            const id = { _id: ObjectId(toyId) }
            const result = await toysCollection.deleteOne(id);
            res.json(result);

        })
        // find toy by id
        app.get('/toys/:id', async (req, res) => {
            const toyId = req.params.id;
            const id = { _id: ObjectId(toyId) }
            const result = await toysCollection.findOne(id);
            res.json(result);

        })

        //-------------order api--------------//
        //order info by email id api
        app.get("/placedOrder", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray();
            res.json(result);
        })
        //all order info api
        app.get("/orders", async (req, res) => {
            const orders = orderCollection.find({});
            const result = await orders.toArray();
            res.json(result);
        })

        // delete by orders api
        app.delete('/orders/:id', async (req, res) => {
            const toyId = req.params.id;
            const id = { _id: ObjectId(toyId) }
            console.log(id);
            const result = await orderCollection.deleteOne(id);
            res.json(result);

        })
        //order placed info api
        app.post("/placedOrder", async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        })

        //-------------users api--------------//
        //users info api
        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.json(result);
        })

        //-------------users api--------------//
        app.post("/reviews", async (req, res) => {
            const review = req.body;
            const result = await reviewsCollection.insertOne(review);
            res.json(result);
        })
        app.get("/reviews", async (req, res) => {
            const cursor = reviewsCollection.find({});
            const result = await cursor.toArray()
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