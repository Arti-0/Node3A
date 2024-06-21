const express = require('express');
const bodyParser = require('body-parser');
const accountsRoute = require('./routes/accounts');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const adminRoute = require('./routes/admin');

const app = express();

app.use(bodyParser.json());

app.use('/accounts', accountsRoute);
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/admin', adminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});