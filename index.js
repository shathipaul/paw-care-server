const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('paw care server is running');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j6khnv2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('pawCare').collection('services')

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.post('/services', async (req, res) => {
            const result = await serviceCollection.insertOne(req.body);
            res.send(result);
        })
    }
    finally {

    }

    try {
        const serviceCollection = client.db('pawCare').collection('services')

        app.get('/serviceslimit', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const limit = await cursor.limit(3).toArray();
            res.send(limit);
        })
    }
    finally {

    }

    try {
        const serviceCollection = client.db('pawCare').collection('services')

        app.get('/services/:id', async (req, res) => {
            const { id } = req.params;
            const query = { _id: ObjectId(id) }
            const servicesId = await serviceCollection.findOne(query);
            res.send(servicesId);
        })
    }
    finally {

    }
    try {
        const reviewCollection = client.db('pawCare').collection('review')

        app.post('/review', async (req, res) => {
            const result = await reviewCollection.insertOne(req.body);
            res.send(result);
            console.log(result);
        })
    }
    finally {

    }
    try {
        const reviewCollection = client.db('pawCare').collection('review')

        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = {service_id: id}
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
            console.log(id);
        })
    }
    finally {

    }
}
run().catch(error => console.log(error));


app.listen(port, () => {
    console.log(`paw care running on: ${port}`);
});