const express = require('express');
const fs = require('fs');
const app = express();
const toursAPI = require('./tours')

app.use(express.json());

app.use('/api/v1/tours', toursAPI);

const port = 3000;
app.listen(port, () => {
  console.log('the server is running on the port:', port);
});
