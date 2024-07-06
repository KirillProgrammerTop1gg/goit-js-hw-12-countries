const { alert, notice, info, success, error } = require('@pnotify/core');
const _ = require('lodash');

const fetchCountries = (name) => fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => !response.ok ? false : response.json());

document.querySelector('.country__input').addEventListener('input', _.debounce(() => {
    document.querySelector('.countries').innerHTML = '';
    document.querySelector('.info').innerHTML = '';
    document.querySelector('.country__input').value !== '' ? fetchCountries(document.querySelector('.country__input').value).then(countries => {
        if (countries){
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            if(countries.length === 1){
                document.querySelector('.info').innerHTML = `
                    <h2 class="info__title">${countries[0].name.common}</h2>
                    <div class="info__main">
                        <div class="info__text">
                            <p class="info__capital"><b>Capital:</b> ${countries[0].capital}</p>
                            <p class="info__population"><b>Population:</b> ${countries[0].population}</p>
                            <p class="info__lang"><b>Languages:</b></p>
                            <ul class="info__languages">${Object.keys(countries[0].languages).map(lang => '<li class="info__language">'+countries[0].languages[`${lang}`]+'</li>').join('')}</ul>
                        </div>
                        <img src="${countries[0].flags.png}" alt="${countries[0].flags.alt}" class="info__flag">
                    </div>
                `
            }
            else if(countries.length >= 2 && countries.length <= 10){
                countries.forEach(country => document.querySelector('.countries').innerHTML += `
                    <li class="countries__item">
                        ${country.name.common}
                    </li>
                `);
            }
            else {
                error({
                    text: "Too many matches found! Please enter a more specific query!",
                    delay: 3000,
                    closer: false,
                    addClass: 'error'
                });
            }
        }
        else{
            error({
                text: "No matches found! Please enter correct query!",
                delay: 3000,
                closer: false,
                addClass: 'error'
            });
        }
    }) : null
},500));