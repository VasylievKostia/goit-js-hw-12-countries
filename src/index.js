import './sass/main.scss';
import fetchCountries from '../src/fetchCountries'
import markupCountry from './tamplates/country.hbs'
import markupCountriesList from './tamplates/countries-list.hbs'


const inputRef = document.querySelector('#search')
const rootRef = document.querySelector('#root')
const countryRef = document.querySelector('#country')
const inputValue = inputRef.value


console.log(inputRef.value)

function hendlerSearch(e) {
    e.preventDefault()
    fetchCountries(inputRef.value)
        .then(response => response.json())
        .then(data => {
            if (data.length === 1) {
                clearMarkup()
                crateSearchedCountryMarkup(data)
            }
            else if (data.length > 1 && data.length < 10) {
                
                console.log(data)
                // clearMarkup()
                createCountriesList(data)
            }
            

        })
        .catch(err => {
            // clearMarkup()
            console.log(err)
        } 
        )
    // crateSearchedCountryMarkup()

}
function crateSearchedCountryMarkup(obj) {
    const markup = obj.map(markupCountry).join('')
    country.insertAdjacentHTML('beforeend', markup)
   
    // console.log(obj)
    
}
function createCountriesList(obj) {
    const markup = obj.map(markupCountriesList).join('')
    // root.innerHTML = createCountriesList(obj);
    root.insertAdjacentHTML('beforeend', markup)
}

function clearMarkup() {
    const markup = ''
    country.innerHTML = ""
}


inputRef.addEventListener('input', hendlerSearch)

// const url = `https://pixabay.com/api/?key=5018958-ed49ccd90878e6614abdf24a6`;



// <div class="searched-country">
//     <h2 class="searched-country__name">{{this.name}}</h2>
//     <div class="searched-country__stats">
//         <p class="searched-country__catipal">Capital: {{this.capital}}</p>
//         <p class="searched-country__population">Population: {{this.population}}</p>
//         <ul class="searched-country__languages-list">Languages: 
//             {{#each this.languages}}
//             <li>{{this.name}}</li>
//             {{/each}}
//         </ul>
       
//     </div>
//     <div class="searched-country__img">
//         <img src="{{this.flag}}" alt="{{this.name}}">
//     </div>
// </div>