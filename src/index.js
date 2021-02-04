import './styles.css';
import countryCard from './country-template.hbs';
import countryList from './countryList.hbs'
import debounce from 'lodash.debounce';
import API from './fetchCountries'
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';



// console.log(countryCard())
const cardContainer = document.querySelector('.js-card-container');
const inputValue = document.querySelector('.input-search');

// inputValue.addEventListener('input', onSearch)
// inputValue.addEventListener('input', debounce(() => { onSearch(); }, 500));
inputValue.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
    e.preventDefault();  
    // const form = e.currentTarget;
    const form = inputValue;
    // const form = e.currentTarget.elements.query.value;
    const searchCountry = form.value;
    //  const searchCountry = form.elements.query.value;
    API.fetchCountryByName(searchCountry)
        .then(renderCountryCard)
        .catch(onFetchError);
}

// function renderCountryCard(country) {
//     const markup = countryCard(country[0]);
//     cardContainer.innerHTML = markup;
// };
function renderCountryCard(countries) {
     if (countries.length > 10) {
    clearMarkup();
    tooManyCountries();
  } else if (countries.length <= 10 && countries.length > 1) {
    clearMarkup();
    renderMarkup(countryList, countries);
  } else if (countries.length === 1) {
    clearMarkup();
    renderMarkup(countryCard, countries[0]);
  } else {
    clearMarkup();
    noResult();
  }
};

function renderMarkup(template, countries) {
  const markup = template(countries);
  cardContainer.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  cardContainer.innerHTML = '';
}

function noResult() {
  info({
    // title: false,
    text: 'No matches found!',
    delay: 1500,
    closerHover: true,
  });
}

function tooManyCountries() {
  error({
    // title: false,
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2500,
    closerHover: true,
  });
}

function onFetchError(error) {
  clearMarkup();

  console.log(error);
}