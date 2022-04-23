const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const port = process.env.PORT || 5000;
const app = express(); 


//middlewares 
app.use(cors()); 
app.use(express.json()); 


//connect to database 

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3dyam.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() =>{
    try{


        await client.connect();
        const database = client.db('fakeUsers');
        const usersCollection = database.collection('users');

        //HOME ENDPOINT
        app.get('/', async(req, res) => {
           res.send('Hello Server')
        })

        //ENDPOINT TO FETCH ALL THE USER DATA FROM DATABASE 
        app.get('/users', async(req, res) => {
            const query = {}; 
            const cursor = await usersCollection.find(query); 
            const users = await cursor.toArray(); 
            res.send(users);
        })
        //DYNAMIC ENDPOINT TO FETCH A SPECIFIC USER BY ID 
        app.get('/users/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}; //specifying the id object with the similar format from the database
            const user = await usersCollection.findOne(query);
            res.send(user);
        })


        //POST METHOD TO ADD A USER TO THE DATABASE 
        app.post('/users', async(req, res) =>{
            const newUser = req.body;
            const results = await usersCollection.insertOne(newUser);
            res.send(results);

        })

        //DELETE METHOD TO DELETE A USER FROM DATABASE
        app.delete('/users/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const results = await usersCollection.deleteOne(query);
            res.send(results); 

        })



    }
    finally{

        // await client.close();

    }
   

};

run().catch(console.dir);








app.listen(port, ()=>{
    console.log('listening on port', port)
})

