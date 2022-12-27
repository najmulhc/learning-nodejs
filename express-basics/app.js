const express = require('express');
const fs = require('fs');
const app = express();

// a function that can modify the incoming the request data 
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status:"success", 
        results: tours.length, 
        data: {
            tours: tours,
        }
    });
});

app.post('/api/v1/tours', (req, res) => {
    const data = JSON.stringify(req.body);
    fs.writeFileSync(`${__dirname}/friends.json`, data);
    res.status(200).json({
        status: "success", 
        data: {
            text: "the POST method is working. "
        }
    })
});

const port = 3000;
app.listen(port, () => {
    console.log('the server is running on the port:', port);
});