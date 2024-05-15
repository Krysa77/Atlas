const staty = document.getElementById('staty');
const regionSelect = document.getElementById('region-select');
// Get the modal
var modal = document.getElementById("modal");
// Get the image and insert it inside the modal
var modalImg = document.getElementById("modal-img");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function openModal(imageSrc) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
  }



function fetchCountries(region) {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            staty.innerHTML = ''; // Clear existing countries
            data.forEach(stat => {
                let blockCountry = `
                <div class="col-xl-2 col-lg-3 col-md-6 col-sm-8">
                <div class="card">
                    <img class="card-img-top" src="${stat.flags.png}" alt="${stat.name.common}" onclick="openModal('${stat.flags.png}')"/>
                    <div class="card-body">
                        <h4 class="card-title">${stat.name.common} <small>(${stat.translations.ces.common})</small></h4>
                        <p class="card-text">
                            <a href="${stat.maps.googleMaps}" target="_blank">View on Map</a>
                            <br>Capital: ${stat.capital}
                            <br>Language: ${Object.values(stat.languages).join(', ')}
                            <br>Currency: ${Object.values(stat.currencies).map(currency => currency.name).join(', ')}
                            <br>Population: ${stat.population}
                            <br>Subregion: ${stat.subregion}
                            <br>Size: ${stat.area} km<sup>2</sup>
                            
                        </p>
                    </div>
                </div>                   
                </div>`;
                staty.innerHTML += blockCountry;
            });
        });
}

// Fetch initial region
fetchCountries(regionSelect.value);

// Listen for changes in the dropdown
regionSelect.addEventListener('change', (event) => {
    fetchCountries(event.target.value);
});
