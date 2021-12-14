const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

// Middlewar

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0shwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);

async function run() {
    try {

        await client.connect();
        const database = client.db('Carwebside')
        const productCollection = database.collection('Product')
        console.log('mogodb is connected');
        // Get Services Api

        app.get('/Productss', async (req, res) => {
            const cursor = productCollection.find({});
            const result = await cursor.toArray();
            console.log(result);
            res.json(result)
        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Running server')
});
app.listen(port, () => {
    console.log('Running server on port', port);
})