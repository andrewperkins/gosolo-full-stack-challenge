const express = require('express');
const axios = require('axios');
const router = express.Router();
let PEOPLE = [];

router.get('/', async (req, res) => {
    try {
        let swapi_url = 'https://swapi.dev/api/people/?page=1';
        let next = true;
        let people = [];

        const { sortBy: sortByQuery } = req.query;

        // Validate soryBy query parameter
        const sortByExpectedValues = ['name', 'height', 'mass'];
        const descSort = sortByQuery && sortByQuery.startsWith('-');
        const sortBy = sortByQuery && sortByQuery.replace('-', '');
        if (sortBy && !sortByExpectedValues.includes(sortBy)) {
            res.status(400).json({ message: 'Invalid query parameter' });
            return;
        }

        // Fetch all people from SWAPI
        if (PEOPLE.length > 0) {
            people = PEOPLE;
        } else {
            while (next !== null) {
                const response = await axios.get(swapi_url);
                people = people.concat(response.data.results);
                next = response.data.next;
                swapi_url = response.data.next;
            }
        }

        if (sortBy) {
            people.sort((a, b) => {
                let a_value = a[sortBy];
                let b_value = b[sortBy];

                if (sortBy === 'name') {
                    a_value = a_value.toLowerCase();
                    b_value = b_value.toLowerCase();

                    if (a_value < b_value) {
                        return -1;
                    }
                    if (a_value > b_value) {
                        return 1;
                    }
                    return 0;
                }

                a_value = parseInt(a_value.replace(',', '')) || 0;
                b_value = parseInt(b_value.replace(',', '')) || 0;
                return a_value - b_value;

            });

            if (descSort) {
                people.reverse();
            }
        }

        PEOPLE = people;
        res.json(people);
    } catch (error) {
        console.error(error);
        res.json([]);
    }
});

module.exports = router;