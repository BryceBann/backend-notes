// require for the dependecies
const express = require('express');
//init the express app
const app = express();
const PORT = process.env.PORT || 3001;
//data parsing set up
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// require the routes file
app.use(require('./routes/routes'))
// add the listener
app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`)
)

