



const countriesElements = document.querySelector('#countries')
const filterBtn = document.querySelector('#filter')
const searchElement = document.querySelector('#search')
const modal = document.querySelector('#modal')
const closeBtn = document.querySelector('#close')

const filterRegion = document.querySelector('#filter-region')
const filterPopulation = document.querySelector('#filter-population')

const searchRegion = document.querySelector('#search-region')
const regionFilters = filterBtn.querySelectorAll('#search-region li') 

const searchPopulation = document.querySelector('#search-population')
const populationFilters = filterBtn.querySelectorAll('#search-population li') 

const closeRegion = document.querySelector('#close-region') 
const closePopulation = document.querySelector('#close-population') 


getCountries()

async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json() 


    displayCountries(countries)
}

function displayCountries(countries) {
   
    countries.forEach(country => {
		const countryEl = document.createElement('div') 
		countryEl.classList.add('card') 

		countryEl.innerHTML = `
            <div class="flag-img">
                <img src="${country.flag}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p class="country-region">
                <strong>Region:</strong>
                ${country.region}
                </p>
                <p class="country-capital">
                <strong>Capital:</strong>
                ${country.capital}
                </p>
                <p class="country-population">
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-code">
                    ${country.numericCode}
                </p>
                </div>
        `
        countryEl.addEventListener('click', () => {
            modal.style.display = 'flex'
            showCountryDetails(country)
        })

        countriesElements.appendChild(countryEl)
    })
}

function showCountryDetails(country){

    const modalBody = modal.querySelector('.modal-body')
	const modalImg = modal.querySelector('img') 

	modalImg.src = country.flag 


    modalBody.innerHTML = `
        <h3 class="country-name">${country.name}</h3>
        <p class="country-region">
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p class="country-capital">
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
        <strong>Alpha 2 code: </strong>
         ${country.alpha2Code}
        </p>
        <p>
        <strong>Population: </strong>
        ${country.population}
        </p>
        <p>
        <strong>Latlng: </strong>
        ${country.latlng}
        </p>

        <p>
        <strong>Area: </strong>
        ${country.area}
        </p>

        <p>
        <strong>Timezones: </strong>
        ${country.timezones}
        </p>

        <p>
        <strong>Current time: </strong>
        ${country.timezone}
        </p>

        <p>
        <strong>Currencies: </strong>
        ${JSON.stringify(country.currencies[0].code)}
        ${JSON.stringify(country.currencies[0].name)}
        ${JSON.stringify(country.currencies[0].symbol)}
        </p>

        <p>
        <strong>Languages: </strong>
        ${JSON.stringify(country.languages[0].iso639_1)}
        ${JSON.stringify(country.languages[0].iso639_2)}
        ${JSON.stringify(country.languages[0].name)}
        ${JSON.stringify(country.languages[0].nativeName)}
        </p>

        <p>
        <strong>Neighbour countries : </strong>
        ${JSON.stringify(country.borders)}

        </p>
        

        `
}


// close the modal

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})

// show and hide 

filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open')

})

filterRegion.addEventListener('click', () => {
    searchRegion.classList.add('open')
})

filterPopulation.addEventListener('click', () => {
    searchPopulation.classList.add('open')
})



closeRegion.addEventListener('click', () => {
    searchRegion.classList.remove('open')
})
closePopulation.addEventListener('click', () => {
    searchPopulation.classList.remove('open')
})



// Filter Region

regionFilters.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText 
		const countryRegion = document.querySelectorAll('.country-region') 

		countryRegion.forEach(region => {
			if (region.innerText.includes(value)  || value === 'All') {
				region.parentElement.parentElement.style.display = 'block' 
			} else {
				region.parentElement.parentElement.style.display = 'none' 
			}
		}) 
	}) 
}) 


// Population Region

populationFilters.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText 
		const countryPopulation = document.querySelectorAll('.country-population') 

		countryPopulation.forEach(population => {
            let populationFilter = (population.innerText).replace('Population: ', '')
			if (populationFilter < value || value === 'All') {
                console.log(populationFilter)
				population.parentElement.parentElement.style.display = 'block' 
			} else {
				population.parentElement.parentElement.style.display = 'none' 
			}
		}) 
	}) 
}) 


// Search

searchElement.addEventListener('input', e => {
    const {value} = e.target 
    const countryName = document.querySelectorAll('.country-name')
    const countryCapital = document.querySelectorAll('.country-capital')
    const countryCode = document.querySelectorAll('.country-code')
    console.log(e.target)

    countryName.forEach(name => {
        if(name.innerText.toLowerCase().includes(value.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block'
        }else {
            name.parentElement.parentElement.style.display = 'none'
        }
    })

    countryCapital.forEach(capital => {
        if(capital.innerText.toLowerCase().includes(value.toLowerCase())) {
            capital.parentElement.parentElement.style.display = 'block'
        }else {
            capital.parentElement.parentElement.style.display = 'none'
        }
    })

    countryCode.forEach(code => {
        if(code.innerText.toLowerCase().includes(value.toLowerCase())) {
            code.parentElement.parentElement.style.display = 'block'
        }else {
            code.parentElement.parentElement.style.display = 'none'
        }
    })

} )