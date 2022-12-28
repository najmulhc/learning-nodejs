const express = require('express');
const fs = require('fs');
const app = express();
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
  );
  
  const getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  };
  
  const getSingleTour = (req, res) => {
    const tour = tours.find((element) => element.id === req.params.id * 1);
    if (!tour) {
      return res.status(404).json({
        status: 'failed',
        message: 'could not found the desired tour!',
      });
    }
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour: tour,
      },
    });
  };
  
  const postSingleTour = (req, res) => {
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
  };
  
  const editTour = (req, res) => {
    const tour = tours.find((element) => element.id === req.params.id * 1);
    if (!tour) {
      return res.status(404).json({
        status: 'failed',
        message: 'could not found the desired tour!',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'data is changed',
      data: {
        ...req.body,
      },
    });
  };
  
  const deleteTour = (req, res) => {
    const tour = tours.find((element) => element.id === req.params.id * 1);
    if (!tour) {
      return res.status(404).json({
        status: 'failed',
        message: 'could not found the desired tour!',
      });
    }
    tours.splice(req.params.id * 1, 1);
    res.status(200).json({
      status: 'success!',
      deletedTour: {
        ...tour,
      },
    });
  };
  app.route('/').get(getAllTours).post(postSingleTour);
  app
    .route('/:id')
    .get(getSingleTour)
    .patch(editTour)
    .delete(deleteTour);

module.exports = app;