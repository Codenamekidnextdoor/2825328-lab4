

const button = document.getElementById('search-btn');
const spinner = document.getElementById("loading-spinner");

button.addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    
});

document.getElementById('country-input').addEventListener("keypress", (event)=>{
    if(event.key == "Enter"){
            const country = document.getElementById('country-input').value;
searchCountry(country);
    }
})

async function searchCountry(countryName) {
    try {
        // Show loading spinner

       
        spinner.style.display = "block";
        document.getElementById('error-message').innerText = "";


        const response  = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        
        const data = await response.json();

        const country = data[0];

       

        
        document.getElementById('country-info').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        const boarders = country.borders;

        if(!boarders){
            return;
        }

        for(let i = 0 ; i < boarders.length; i++){

            const response2 = await fetch(`https://restcountries.com/v3.1/alpha/${boarders.at(i)}`);
            const data2 = await response2.json();
            const country2 = data2[0];
            console.log(country2);
            
            const card = document.createElement('div');
            card.classList.add('bordering-countries')
            card.innerHTML = `
            <h2 style = " ">${country2.name.common}</h2>
            <img style = "image-width: 20px, height: 20px" src="${country2.flags.svg}" alt="${country2.name.common} flag">
            `;

            document.getElementById('bordering-countries').appendChild(card);

        }

        

        

        
        // Fetch country data


        // Update DOM
        // Fetch bordering countries
        // Update bordering countries section
    } catch (error) {
        document.getElementById('error-message').innerText = "An error has occured. Check if everything is being fetche corerctly";
    } finally {
        spinner.style.display = "none";
    }
}

// Event listeners
