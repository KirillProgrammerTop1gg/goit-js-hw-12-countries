const fetchCountries = (name) => fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => !response.ok ? console.error(`Error fetched countries: ${response.status}`) : response.json());

fetchCountries('Ukra').then(data => console.log(data));

// document.querySelector('.country__input').addEventListener('click')