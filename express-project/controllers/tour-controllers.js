const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

// middlewares
exports.tourValidator = (req, res, next, val) => {
  const tour = tours.find((element) => element.id === val * 1);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'could not found the desired tour!',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (req.body.name && req.body.price) {
    next();
  } else {
    return res.status(400).json({
      status: 'failed',
      message: 'tour name or price is missing',
    });
  }
};

// route handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.currentTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getSingleTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      tour: tours[req.params.id * 1],
    },
  });
};

exports.postSingleTour = (req, res) => {
  const newTour = req.body;
  tours.push({
    id: tours.length,
    ...newTour,
  });
  const finalNewTour = JSON.stringify(tours);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours.json`,
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

exports.editTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'data is changed',
    data: {
      ...req.body,
    },
  });
};

exports.deleteTour = (req, res) => {
  const tour = tours[req.params.id];
  tours.splice(req.params.id * 1, 1);
  res.status(200).json({
    status: 'success!',
    deletedTour: {
      ...tour,
    },
  });
};
