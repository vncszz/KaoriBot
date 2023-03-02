const express = require('express');
const mongoose = require('mongoose');
const app = express();

const uri = 'mongodb+srv://NeoGenesis:SU4NLCVvuT7UkhwA@animesbrasil.frj4gm7.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('erro');
    }
}

connect();


app.listen(8000,() => { 
    console.log('server iniciado na porta 8000');
});

