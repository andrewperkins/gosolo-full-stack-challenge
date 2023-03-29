const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const peopleRoute = require('./routes/People');
const planetsRoute = require('./routes/Planets');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/people', peopleRoute);
app.use('/planets', planetsRoute);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
