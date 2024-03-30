import { initDarkMode } from "./common.js";

const getCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

document.querySelectorAll(".dropdown-body li").forEach((item) => {
  item.addEventListener("click", () => {
    const selectedRegion = item.dataset.region;
    const countries = document.querySelectorAll(".country");
    countries.forEach((country) => {
      const countryRegion = country.getAttribute("data-country-region");
      if (selectedRegion === "all" || selectedRegion === countryRegion) {
        country.style.display = "block";
      } else {
        country.style.display = "none";
      }
    });
  });
});
const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const countries = document.querySelectorAll(".country");
  countries.forEach((country) => {
    const countryName = country.getAttribute("data-country-name").toLowerCase();
    if (countryName.includes(searchTerm)) {
      country.style.display = "block";
    } else {
      country.style.display = "none";
    }
  });
});

const dropdownHeader = document.querySelector(".dropdown-header");
const dropdownBody = document.querySelector(".dropdown-body");
const dropDownStyle = dropdownBody.style;

dropdownHeader.addEventListener("click", () => {
  dropDownStyle.opacity = dropDownStyle.opacity === 1 ? 0 : 1;
  dropDownStyle.visibility =
    dropDownStyle.visibility === "visible" ? "hidden" : "visible";
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".dropdown-header")) {
    dropDownStyle.opacity = "0";
    dropDownStyle.visibility = "hidden";
  }
});

const populateCountryGrid = async () => {
  // put the html in a template and call it as a clone function
  const allData = await getCountries();
  const cGrid = document.querySelector(".countries-grid");
  allData.forEach((country) => {
    const countryName = country.name.common;
    const displayName =
      countryName === "Palestine" ? "Not Existed" : countryName;
    const a = document.createElement("a");
    a.href = "details.html?data=" + country.name.common.toString();
    a.classList.add("country", "scale-effect");
    a.setAttribute("data-country-name", countryName);
    a.setAttribute("data-country-region", country.region);

    const countryFlag = document.createElement("div");
    countryFlag.classList.add("country-flag");
    const flagImg = document.createElement("img");
    flagImg.src = `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`;
    flagImg.alt = `${displayName} Flag`;
    countryFlag.appendChild(flagImg);

    const countryInfo = document.createElement("div");
    countryInfo.classList.add("country-info");
    const countryTitle = document.createElement("h2");
    countryTitle.classList.add("country-title");
    countryTitle.textContent = displayName;
    const countryBrief = document.createElement("ul");
    countryBrief.classList.add("country-brief");
    const population = document.createElement("li");
    population.innerHTML = `<strong>Population: </strong>${country.population.toLocaleString()}`;
    const region = document.createElement("li");
    region.innerHTML = `<strong>Region: </strong>${country.region}`;
    const capital = document.createElement("li");
    capital.innerHTML = `<strong>Capital: </strong>${country.capital || "N/A"}`;

    countryBrief.appendChild(population);
    countryBrief.appendChild(region);
    countryBrief.appendChild(capital);

    countryInfo.appendChild(countryTitle);
    countryInfo.appendChild(countryBrief);

    a.appendChild(countryFlag);
    a.appendChild(countryInfo);

    cGrid.appendChild(a);

    a.addEventListener("click", (e) => {
      window.location.href = "details.html";
    });
  });
};
initDarkMode();
populateCountryGrid();
