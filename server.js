/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Utsav Gautam Student ID: 157891219 Date: Feb 3 2024
*   
*  Online (Cyclic) Link: 
*
********************************************************************************/


const express = require('express');
const unCountryData = require('./modules/unCountries');

const app = express();
const port = 3000; // You can change this port number as needed

// Ensure that the countries array has been successfully built before starting the server
unCountryData.initialize()
    .then(() => {
        // Configure routes

        // Route: GET "/"
        app.get('/', (req, res) => {
            res.send('Assignment 2: Utsav Gautam - 157891219');
        });

        // Route: GET "/un/countries"
        app.get('/un/countries', (req, res) => {
            const countries = unCountryData.getAllCountries();
            res.json(countries);
        });

        // Route: GET "/un/countries/code-demo"
        app.get('/un/countries/code-demo', (req, res) => {
            const countryCode = 'ca'; // Replace with any valid country code
            unCountryData.getCountryByCode(countryCode)
                .then(country => res.json(country))
                .catch(error => res.status(500).send(`Error: ${error.message}`));
        });

        // Route: GET "/un/countries/region-demo"
        app.get('/un/countries/region-demo', (req, res) => {
            const regionName = 'oceania'; // Replace with any valid region name
            unCountryData.getCountriesByRegion(regionName)
                .then(countries => res.json(countries))
                .catch(error => res.status(500).send(`Error: ${error.message}`));
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch(error => console.error(`Initialization error: ${error.message}`));
