import './sass/main.scss';
import fetchCountries from '../src/fetchCountries'
import markupCountry from './tamplates/country.hbs'
import markupCountriesList from './tamplates/countries-list.hbs'
import { alert, notice, info, success, error, defaults } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';




const inputRef = document.querySelector('#search')
const rootRef = document.querySelector('#root')
const countryRef = document.querySelector('#country')
const inputValue = inputRef.value

// defaults.delay = 2500;
const debounce = require('lodash.debounce');

function hendlerSearch(e) {
    e.preventDefault()
    fetchCountries(inputRef.value)
        .then(response => response.json())
        .then(data => {
            if (data.length === 1) {
                clearMarkup()
                crateSearchedCountryMarkup(data)
                success({
                    text: 'Найдена страна!'
                });
            }
            else if (data.length > 1 && data.length < 10) {
                clearMarkup()
                createCountriesList(data)
            }
            else if (data.length >= 10) {
                clearMarkup()
                error({
                    text: 'Слишком много совпадений.'
                });
            }
        })
        .catch(err => {
            clearMarkup()
            error({
                    text: 'Страна не найдена :('
                });

        })
}


function createCountriesList(obj) {
    const markup = obj.map(markupCountriesList).join('')
    country.insertAdjacentHTML('afterbegin', markup)
}

function crateSearchedCountryMarkup(obj) {
    const markup = obj.map(markupCountry).join('')
    country.insertAdjacentHTML('beforeend', markup)
}

function clearMarkup() {
    const markup = ''
    country.innerHTML = ""
}

inputRef.addEventListener('input', debounce(hendlerSearch, 500) )

