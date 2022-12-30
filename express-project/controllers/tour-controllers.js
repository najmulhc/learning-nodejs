const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

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

exports.postSingleTour = (req, res) => {
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

exports.editTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
