const countryData = require("../data/countryData");
const regionData = require("../data/regionData");

let countries = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      countries = [];
      countryData.forEach(country => {
        const region = regionData.find(region => region.id === country.regionId);
        const countryWithRegion = { ...country, region };
        countries.push(countryWithRegion);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function getAllCountries() {
  return new Promise((resolve, reject) => {
    try {
      resolve(countries);
    } catch (error) {
      reject(error);
    }
  });
}

function getCountryByCode(countryCode) {
  return new Promise((resolve, reject) => {
    try {
      const country = countries.find(country => country.a2code.toLowerCase() === countryCode.toLowerCase());
      if (country) {
        resolve(country);
      } else {
        reject("Unable to find the requested country");
      }
    } catch (error) {
      reject(error);
    }
  });
}

function getCountriesByRegion(region) {
  return new Promise((resolve, reject) => {
    try {
      const filteredCountries = countries.filter(country => country.region.name.toLowerCase().includes(region.toLowerCase()));
      if (filteredCountries.length > 0) {
        resolve(filteredCountries);
      } else {
        reject("Unable to find countries in the requested region");
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { initialize, getAllCountries, getCountryByCode, getCountriesByRegion };
