const express = require('express');
const fs = require('fs');
const app = express();

// app.get('/', (req, res) => {
//     const response = {
//         name: 'Najmul Huda Chowdhury', 
//         department: "Management Information Systems",
//     }
//     res.status(404).json(response)
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status:"success", 
        results: tours.length, 
        data: {
            tours: tours,
        }
    })
})

const port = 3000;
app.listen(port, () => {
    console.log('the server is running on the port:', port);
});