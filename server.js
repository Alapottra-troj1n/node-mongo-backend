const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const port = process.env.PORT || 5000;
const app = express(); 


//middlewares 
app.use(cors()); 
app.use(express.json()); 


//connect to database 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3dyam.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() =>{
    try{


        await client.connect();
        const database = client.db('fakeUser');
        const usersCollection = database.collection('users');
        console.log('hello')


    }
    finally{



    }
   

};

run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('hello world from node server')
})

app.listen(port, ()=>{
    console.log('listening on port', port)
})

