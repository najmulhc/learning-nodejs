const express = require('express'); 
const app = express();
const toursAPI = require('./tours')

app.use(express.json());

//creating our own middleware 
app.use((req, res, next) => {
  // the code for the middleware 
  console.log("This is a text from the middleware that will be logged if any kind of request is there.");

  // MUST HAVE: we must call the next() function in order to get out of the request response loop. otherwise the function will stuck inside the middleware stack and will not send any kind of response. 
  next();
})

app.use('/api/v1/tours', toursAPI);

const port = 3000;
app.listen(port, () => {
  console.log('the server is running on the port:', port);
});
