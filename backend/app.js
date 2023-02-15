const express = require('express');

const app = express();
app.use(express.json());
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const stuffRoutes = require('./routes/stuff.js');
const userRoutes = require('./routes/user.js');

mongoose.connect('mongodb+srv://sidi:rennes35@cluster0.49czm5o.mongodb.net/myDatabase?',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use('/api/stuff',stuffRoutes);

app.use('/api/auth',userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;