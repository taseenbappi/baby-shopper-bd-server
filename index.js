const express = require('express')
const cors = require("cors");
const app = express()
const port = process.env.PORT || 5000;

// midleware
app.use(cors())
app.use(express.json());

// root api
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// port listener
app.listen(port, () => {
    console.log(`listening at:${port}`)
})