const url = "https://www.maglus.site/wp-json/wc/store/products";
const gamesContainer = document.querySelector(".games");
const gamesToDisplay = [5, 6, 7, 8];

async function fetchGames() {
    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const json = await response.json();

        loader.style.display = "none";

        const games = gamesToDisplay.map(position => json[position]).filter(Boolean);

        games.forEach(function(game) {
            const priceRaw = `${game.prices.price}`;
            const priceFormat = (parseFloat(priceRaw) / 100).toFixed(2);
            gamesContainer.innerHTML += `<div class="game">
            <div>
            <img class="game-cover" src="${game.images[0].src}" alt="Game cover for ${game.name}">
            <a href="games/game.html?id=${game.id}" class="view-game">View game</a>
            </div>
            <h3 class="game-title">${game.name}</h3>
            <h4 class="game-price">$${priceFormat}</h4>
            </div>`
        })
    } catch (error) {
        loader.style.display = "none";
        gamesContainer.innerHTML = displayError(error);
    }

}

fetchGames();