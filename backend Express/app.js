const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const cors=require('cors');

const host = 'localhost';
const port = 2022;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes)

const cloudUrl = 'mongodb+srv://GauravGavkar:Gaurav@18@cluster0.dfdws.mongodb.net/Mango?retryWrites=true&w=majority';

mongoose.connect(cloudUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log(`Server Successfully Running at ${host} : ${port}.`);
        });
    })
    .catch()