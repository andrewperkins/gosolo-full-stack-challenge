const express = require('express');
const axios = require('axios');
const router = express.Router();
let PLANETS = [];

router.get('/', async (req, res) => {
    try {
        if (PLANETS.length > 0) {
            res.json(PLANETS);
            return;
        }
        let swapi_url = 'https://swapi.dev/api/planets/?page=1';
        let next = true;
        let planets = [];

        // Fetch all planets from SWAPI
        while (next !== null) {
            const response = await axios.get(swapi_url);
            planets = planets.concat(response.data.results);
            next = response.data.next;
            swapi_url = response.data.next;
        }

        // Get residents name for each planet
        planets = planets.map(async (planet) => {
            let residents = planet.residents;

            residents = residents.map(async (resident) => {
                const response = await axios.get(resident);
                return response.data.name;
            });

            // wait for all promises to resolve
            residents = await Promise.all(residents);

            return {
                ...planet,
                residents
            };
        });

        planets = await Promise.all(planets);

        PLANETS = planets;
        res.json(planets);
    } catch (error) {
        console.error(error);
        res.json([]);
    }
});

module.exports = router;