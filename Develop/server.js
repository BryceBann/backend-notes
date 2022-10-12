const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


require("./routes/routes")(app);

app.listen(PORT, () => 
console.log('App listening at http://localhost:${PORT}')
)