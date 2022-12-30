const express = require('express');

const tourRouter = express.Router();
const {
  getAllTours,
  getSingleTour,
  postSingleTour,
  editTour,
  deleteTour,
  tourValidator,
  checkBody,
} = require('../controllers/tour-controllers');

tourRouter.param('id', tourValidator);

tourRouter.route('/').get(getAllTours).post(checkBody, postSingleTour);
tourRouter.route('/:id').get(getSingleTour).patch(editTour).delete(deleteTour);

module.exports = tourRouter;
