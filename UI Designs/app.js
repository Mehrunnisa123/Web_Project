const path = require('path');

const express = require('express');

const db = require('./data/database');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));


app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/admin', adminRoutes);


db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });