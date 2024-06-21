
const express = require('express');
const bodyParser = require('body-parser');
const accountsRoute = require('./routes/accounts');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/accounts', accountsRoute);
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

// Example of a simple route
app.get('/', (req, res) => {
    res.send('Welcome to your e-commerce API');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});