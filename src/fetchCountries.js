const BASE_URL = 'https://restcountries.eu/rest/v2'

function fetchCountryByName(countryName) {
    const url = `${BASE_URL}/name/${countryName}`;
    return fetch(url).then(response => {
    return response.json();
    })
    // .then(renderCountryCard)
    // .catch (error => console.log(error)); 
    };

    export default{fetchCountryByName}