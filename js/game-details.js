const gameDetailContainer = document.querySelector(".game");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://www.maglus.site/wp-json/wc/store/products/" + id;

async function fetchGame() {

    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const details = await response.json();

        const priceRaw = `${details.prices.price}`;
        const priceFormat = (parseFloat(priceRaw) / 100).toFixed(2);

        document.title = `${details.name} | GameHub`;
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute('content', details.description);
        }

        gameDetailContainer.innerHTML = `<img class="game-poster" src="${details.images[0].src}" alt="Poster image for ${details.name}">
        <div class="game-info">
        <h1 class="game-title">${details.name}</h1>
        <div class="d-key"><i class="fa-solid fa-key"></i> Digital Key</div>
        <hr class="seperator">
        <h2 class="game-price">$${priceFormat}</h2>
        <p class="game-desc">${details.description}</p>
        <p class="released"><span class="bolder">Released: </span>${details.attributes[0].terms[0].name}</p>
        <p class="age-rating"><span class="bolder">Age rating: </span>${details.attributes[1].terms[0].name}</p>
        <p class="genre"><span class="bolder">Genre: </span>${details.attributes[2].terms[0].name}</p>
        <div class="platform">
            <h3>Platform:</h3>
            <div class="platforms">
                <button class="platform-btn">PS5</button>
                <button class="platform-btn">XBOX</button>
                <button class="platform-btn" style="margin-right: 0px;">PC</button>
            </div>
        </div>
        <button class="add-to-cart" data-game-id="${details.id}">Add to cart</button>
        <div class="added-to-cart-msg">
            <span class="added-text">Game added to cart</span>
        </div>
        </div>`

        /*Add to cart function*/
        const addToCartButton = document.querySelector(".add-to-cart");
        const addedToCartMsg = document.querySelector(".added-to-cart-msg");
        addToCartButton.addEventListener("click", function (event) {
            const gameId = event.target.getAttribute("data-game-id");
            const gameDetails = gameId;
            shoppingCart.push(gameDetails);
            saveCartToLocalStorage(shoppingCart);
            addedToCartMsg.style.display = "block";
            setTimeout(function () {
                addedToCartMsg.style.display = "none";
            }, 4000);
            addedToCartMsg.addEventListener("click", function () {
                addedToCartMsg.style.display = "none";
            });
        });
        /*---*/
    } catch (error) {
        loader.style.display = "none";
        gameDetailContainer.innerHTML = displayError(error);
    }
}

fetchGame();