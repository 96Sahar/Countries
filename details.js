import { initDarkMode } from "./common.js";
initDarkMode();

function displayCountryDetails(country) {
  // put the html i wrote in the countryHtml.innerHTML in the original html and use spans with classes insted
  const countryDetails = document.querySelector(".main");
  const CountryHtml = document.createElement("div");
  CountryHtml.classList.add("container");

  const getCommonName = (country) => {
    if (country.name.common === "Israel") {
      return country.name.nativeName.heb.common;
    }

    return Object.values(country.name.nativeName)[0].common;
  };

  const getCurrency = (country) => {
    return Object.values(country.currencies)[0].name;
  };

  const commonName = getCommonName(country);
  const currencyName = getCurrency(country);

  CountryHtml.innerHTML = ` 
                    <div class="flag-container">
                    <img src="${country.flags.svg}" alt="${
    country.name.common
  } Flag" class="flag">
                    </div>
                    <div class="details-container">
                        <h1 class="title">${country.name.common}</h1>
                        <ul class="details">
                            <li><strong>Native Name: </strong>${commonName}</li>
                            <li><strong>Population: </strong>${country.population.toLocaleString()}
                            </li>
                            <li><strong>Region: </strong>${country.region}</li>
                            <li><strong>Sub Region: </strong>${
                              country.subregion
                            }</li>
                            <li><strong>Capital: </strong>${
                              country.capital
                            }</li>
                            <li><strong>Top Level Domain: </strong>${country.tld.join(
                              ", "
                            )}</li>
                            <li><strong>Currencies: </strong>${currencyName}</li>
                            <li><strong>Languages: </strong>${Object.values(
                              country.languages
                            )}</li>
                            </ul>
                            </div>`;

  countryDetails.appendChild(CountryHtml);
}
async function fetchCountryDetails(countryName) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    alert(error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const queryParams = new URLSearchParams(window.location.search);
  const countryName = queryParams.get("data");
  console.log(countryName);
  const countryDetails = await fetchCountryDetails(countryName);
  displayCountryDetails(countryDetails);
});