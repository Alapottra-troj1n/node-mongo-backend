const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const port = process.env.PORT || 5000;
const app = express(); 


//middlewares 
app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('hello world from node server')
})

app.listen(port, ()=>{
    console.log('listening on port', port)
})

