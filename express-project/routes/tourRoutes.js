const express = require('express');

const tourRouter = express.Router();
const {
  getAllTours,
  getSingleTour,
  postSingleTour,
  editTour,
  deleteTour,
} = require('../controllers/tour-controllers');

tourRouter.route('/').get(getAllTours).post(postSingleTour);
tourRouter.route('/:id').get(getSingleTour).patch(editTour).delete(deleteTour);

module.exports = tourRouter;
