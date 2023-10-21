
const url = "https://www.maglus.site/wp-json/wc/store/products";
const gamesContainer = document.querySelector(".games");
const sortingTypeSelect = document.querySelector("#sorting-type");

let games = [];

async function fetchGames() {

    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const json = await response.json();

        games = json;
        originalOrder = [...json];

        sortGamesByPopularity();

        sortingTypeSelect.addEventListener("change", handleSortingChange);
    } catch (error) {
        loader.style.display = "none";
        gamesContainer.innerHTML = displayError(error);
    }
}

function displayGames() {
    gamesContainer.innerHTML = "";

    games.forEach(function (game) {
        gamesContainer.innerHTML += `<a href="games/game.html?id=${game.id}"><img src="${game.images[0].src}" alt="Game cover for ${game.name}"></a>`;
    });
}

/*Sorting functionality*/
function handleSortingChange() {
    const selectedOption = sortingTypeSelect.value;

    if (selectedOption === "Popularity") {
        sortGamesByPopularity();
    } else if (selectedOption === "Price - lowest") {
        sortGamesByPriceLowest();
    } else if (selectedOption === "Price - highest") {
        sortGamesByPriceHighest();
    }
}
function sortGamesByPopularity() {
    games = [...originalOrder];
    displayGames();
}
function sortGamesByPriceLowest() {
    games.sort((a, b) => a.price - b.price);
    displayGames();
}
function sortGamesByPriceHighest() {
    games.sort((a, b) => b.price - a.price);
    displayGames();
}

fetchGames();
