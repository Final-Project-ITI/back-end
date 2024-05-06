const express = require('express')
const app = express()
const port = 3000
const database = require("./database/database");


database();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})