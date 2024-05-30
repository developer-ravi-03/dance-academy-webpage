const express = require("express");
const path = require("path");  //path setup
const app = express();
// const fs = require("fs");  //path setup
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
const port = 8000;
main().catch(err => console.log(err));
// connect database
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

}

// define mongoose schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', ContactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))  //for serving static files
app.use(express.urlencoded())

// PUG SPECIFIC
app.set('view engine', 'pug')// Set The template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the view directory

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This data has been saved to the database")
    }).catch(() => {
        res.status(400).send("Itsem was not saved to the data base")
    });
    // res.status(200).render('contact.pug',params);
})

//START THE SERVERS
app.listen(port, () => {
    console.log(`The Application started successfully on port ${port}`)
})