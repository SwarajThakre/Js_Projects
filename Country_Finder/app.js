// Theme Toggle Logic
const Themebtn = document.querySelector("#themeBtn");

let currentTheme = localStorage.getItem("theme") || getSystemTheme();

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
        Themebtn.innerHTML = '🌛';
    } else {
        Themebtn.innerHTML = '🌞';
    }
}

function toggleTheme() {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
}

Themebtn.addEventListener("click", toggleTheme);

applyTheme(currentTheme);


// Api Config
const API_URL = "https://restcountries.com/v3.1";
const API_FIELDS = "name,flags,cca3,capital,region,subregion,population,area,languages,currencies";

// UI Logic
const searchInput = document.querySelector("#q");
const regionFilter = document.querySelector("#region");
const sortBy = document.querySelector("#sort");
const statusMsg = document.querySelector("#status");
const resultsContainer = document.querySelector("#results");
const detailsContainer = document.querySelector("#details");
const randomBtn = document.querySelector("#randomBtn");
const clearBtn = document.querySelector("#clearBtn");
const suggestionsList = document.querySelector("#suggestions");


// State Management
let allCountries = [];
let searchResults = [];
let selectedSuggestionIdx = -1;


// Api Fetching Logic
async function fetchCountries() {
    try {
        const url = `${API_URL}/all?fields=${encodeURIComponent(API_FIELDS)}`; 
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        
        if (!Array.isArray(data)) {
            throw new Error("Unexpected response format");
        }

        return data;
        
    } catch (error) {
        throw new Error(`Failed to fetch countries: ${error?.message}`);
    }
}

function updateStatus(message, tone = "muted") {
    statusMsg.textContent = message;
    statusMsg.dataset.tone = tone;
}

// render function ------

function renderSuggestions(countries) {
    suggestionsList.innerHTML = "";
    selectedSuggestionIdx = -1;

    if (countries.length === 0) {
        suggestionsList.hidden = true;
        return;
    }

    countries.slice(0, 5).forEach((country, idx) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestions__item");
        suggestionItem.setAttribute("role", "option");
        suggestionItem.dataset.index = String(idx);

        const countryName = document.createElement("div");
        countryName.classList.add("suggestions__name");
        countryName.textContent = country.name.common;

        const countryRegion = document.createElement("div");
        countryRegion.classList.add("suggestions__region");
        countryRegion.textContent = country.region;
        suggestionItem.appendChild(countryName);
        suggestionItem.appendChild(countryRegion);
        
        suggestionItem.addEventListener("mousedown", (e) => {
            e.preventDefault();
            showDetails(country);
            suggestionsList.hidden = true;
        });
        suggestionsList.appendChild(suggestionItem);
    });

    suggestionsList.hidden = false;
}

function renderCountries(countries) {
    resultsContainer.innerHTML = "";

    if  (countries.length === 0) {
        statusMsg.textContent = "No countries found.";
        return;
    }
    //  limit to 60 countries for performance
    const limitedCountries = countries.slice(0, 60);

    limitedCountries.forEach(country =>{
        const countryCard = document.createElement("button", "card");
        countryCard.type = "button";
        countryCard.classList.add("card");
        // Add click and keyboard event listeners for accessibility
        countryCard.addEventListener("click", () => {
            showDetails(country);
        });
        countryCard.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                showDetails(country);
            }
        });

        countryCard.innerHTML = `
            <div class="flag">
                <img  src="${country?.flags?.svg || country?.flags?.png || "https://placehold.co/92x64?text=No+Flag"}" alt="Flag of ${country.name.common}" loading="lazy">
            </div>
            <div>
                <div class="card__title">
                    <h3 >${country?.name?.common}</h3>
                </div>
                <div class="muted">
                    <p>Capital:${country.capital ? country.capital[0] : "No capital"}, ${country.region}, ${country.cca3}</p>
                </div>
                <div class="card__meta">
                    <span class="pill"><strong>🏦</strong> ${country.capital ? country.capital[0] : "No capital"}</span>
                    <span class="pill"><strong>🌐</strong> ${country.region}</span>
                    <span class="pill"><strong>👥</strong> ${country.population.toLocaleString()}</span>
                </div>
            </div>    
        `;

        countryCard.addEventListener("click", () => {
            showDetails(country);
        });

        resultsContainer.appendChild(countryCard);
    })
    statusMsg.textContent = `${countries.length} countries found.`;
}

function renderResults(countries) {
    resultsContainer.innerHTML  = "";

    if (countries.length === 0) {
        const noResultsMsg = document.createElement("div");
        noResultsMsg.classList.add("empty");
        noResultsMsg.textContent = "No countries found.";
        resultsContainer.appendChild(noResultsMsg);
        return;
    }
}

function showDetails(country) {
  // update search input
  searchInput.value = country.name.common;
  suggestionsList.hidden = true;

  // clear details and build new view
  detailsContainer.innerHTML = "";

  const detailsCard = document.createElement("div");
  detailsCard.classList.add("details__hero");

  detailsCard.innerHTML = `
    <div class="details__top">
        <div>
            <h3 class="details__name">${country.name.common}</h3>
            <div class="details__native">
              Native : ${
                country.name.nativeName
                  ? country.name.nativeName[
                      Object.keys(country.name.nativeName)[0]
                    ].common
                  : "—"
              }
            </div>
        </div>
        <div class="flag">
            <img src="${country.flags.svg}" 
                 alt="Flag of ${country.name.common}" 
                 width="92" height="64" loading="lazy">
        </div>
    </div>
  `;

 
// create stats grid
  const statsGrid = document.createElement("div");
  statsGrid.className = "details__grid";

  function addStat(label, value) {
    const row = document.createElement("div");
    row.className = "stat";

    const key = document.createElement("div");
    key.className = "stat__k";
    key.textContent = label;

    const val = document.createElement("div");
    val.className = "stat__v";
    val.textContent = value || "—";

    row.append(key, val);
    statsGrid.append(row);
  }

  addStat("Capital", country.capital ? country.capital[0] : "—");
  addStat("Region", country.region);
  addStat("Subregion", country.subregion);
  addStat("Population", country.population?.toLocaleString());
  addStat(
    "Area",
    country.area ? `${country.area.toLocaleString()} km²` : "—"
  );

  addStat(
    "Languages",
    country.languages
      ? Object.values(country.languages).join(", ")
      : "—"
  );

  addStat(
    "Currencies",
    country.currencies
      ? Object.values(country.currencies)
    //   name and symbol for each currency
          .map(cur => `${cur.name} (${cur.symbol || "N/A"})`)
          .join(", ")
      : "—"
  );

  // append stats to card
  detailsCard.appendChild(statsGrid);

  // append card to container
  detailsContainer.appendChild(detailsCard);
}

// User Interaction Logic ------------

function pickRandomCountry() {
    if (allCountries.length === 0) {
        updateStatus("No countries available to pick.", "error");
        return;
    }
    const randomIndex = Math.floor(Math.random() * allCountries.length);
    const randomCountry = allCountries[randomIndex];
    showDetails(randomCountry);
}

function clearSearch(){
    searchInput.value = "";
    suggestionsList.hidden = true;
    detailsContainer.innerHTML = "";

    const placeholder = document.createElement("div");
    placeholder.classList.add("empty");
    placeholder.textContent = "Select a country to see details.";
    detailsContainer.appendChild(placeholder);  

    updateStatus("Search cleared. Showing all countries.", "muted");
}

function setUpEventListeners() {
    searchInput.addEventListener("input", () =>{
        const query = searchInput.value.trim().toLowerCase();
        if (query.length === 0) {
            suggestionsList.hidden = true;
            return;
        }
        suggestionsList.hidden = false;
        updateSuggestionsFromInput(query);
    });

    searchInput.addEventListener("keydown", (e) => {

        if(e.key === "Escape") {
            e.preventDefault();
            clearSearch();
            return;
        }
        
        // If suggestions hidden, don't handle arrow keys
        if (suggestionsList.hidden) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedSuggestionIdx = (selectedSuggestionIdx + 1) % searchResults.length;
            updateSuggestionHighlight();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedSuggestionIdx = (selectedSuggestionIdx - 1 + searchResults.length) % searchResults.length;
            updateSuggestionHighlight();
        }
    });

    // clear button
    clearBtn.addEventListener("click", clearSearch);

    // Random button
    randomBtn.addEventListener("click", pickRandomCountry);
}

// Initialization
async function init() { 
    applyTheme(currentTheme);
    try {
        allCountries = await fetchCountries();
        console.log(allCountries);
        
        renderCountries(allCountries);
        
    }catch (error) {
        statusMsg.textContent = error.message;
    }
}

init();
