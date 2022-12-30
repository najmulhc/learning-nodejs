const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './config.env',
});
const port = 3000;

app.listen(port, () => {
  console.log('the server is running on the port:', port);
});
