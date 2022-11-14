const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8000

// ORM Mongoose
mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_ADRESSE}:${process.env.MONGO_PORT}`)

// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Tchoubiloupipou' });
// kitty.save().then(() => console.log('meow')); 
// create new collection customer
// customer model : firstname, lastname

app.use(express.json())


const Customer = mongoose.model('Customers', { firstName: String, lastName: String });
// create new customer with post method 

// Routes express
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//get all customers
app.get('/customers', (req, res) => {
    Customer.find()
    .then(customers => res.json(customers))
    .catch(err => res.status(400).json('Error: ' + err));
    
    res.send('Get all customers')

    
})
//get a single customer
app.get('/customers/:id', (req, res) => {
    Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json('Error: ' + err));
    
})
//create a customer
app.post('/customers', (req, res) => {
    const data = req.body
    const customer = new Customer(data);
    customer.save().then(dataDB=> {
        res.send(dataDB)
    })

})
//update a customer
app.put('/customers/:id', (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const customer = Customer.findByIdAndUpdate(id, data, {new: true})
        res.send(customer)
    } catch (error) {
        res.status(500).send(error)
    }

})
//delete a customer
app.delete('/customers/:id', (req, res) => {
    const id = req.params.id
    const collection = Customer.findByIdAndDelete(id)

    collection.deleteOne({ _id: id }, function(err) {
        if (err) throw err;
        console.log("1 document deleted");
        });
    res.send('Delete a customer')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})














