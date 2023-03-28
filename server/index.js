const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const peopleRoute = require('./routes/People');

const app = express();

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/people', peopleRoute);
app.get('/planets', (req, res) => res.send('Found'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
