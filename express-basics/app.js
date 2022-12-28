const express = require('express');
const fs = require('fs');
const app = express();

// a function that can modify the incoming the request data
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {

  const tour = tours.find((element) => element.id === req.params.id * 1);
  if(!tour){
    return res.status(404).json({
        status: "failed", 
        message: "could not found the desired tour!"
    })
 }
  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      tour: tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newTour = req.body;
  tours.push({
    id: tours.length,
    ...newTour,
  });
  const finalNewTour = JSON.stringify(tours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    finalNewTour,
    (error, result) => {
      if (error) {
        res.status(503).json({
          status: 'failed',
          data: {
            message: 'internal server error (while writing on the file)',
          },
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          message: 'the requested tour has been added into the database',
        },
      });
    }
  );
});

// handling parameters of HTTP request

const port = 3000;
app.listen(port, () => {
  console.log('the server is running on the port:', port);
});
