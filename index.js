const express = require('express')
const cors = require("cors");
const { MongoClient } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// midleware
app.use(cors())
app.use(express.json());


// mongoDB connection
const uri = "mongodb+srv://<username>:<password>@cluster0.wyglv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// root api
app.get('/', (req, res) => {
    res.send('BabyShoper Server is ON!!')
})

// port listener
app.listen(port, () => {
    console.log(`listening at:${port}`);
})