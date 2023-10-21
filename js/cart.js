// OPTIONAL WORK

const errors = document.querySelector(".errors");

async function fetchGameDetails(gameId) {
    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";
    const url = `https://www.maglus.site/wp-json/wc/store/products/${gameId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const details = await response.json();
        loader.style.display = "none";
        return details;
    } catch (error) {
        errors.innerHTML = displayError(error);
    }
}

function calculateTotal(cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price;
    });
    const vat = 0.25 * total;
    return { total, vat };
}

const clearCartButton = document.querySelector(".clear-cart");
const goToCheckout = document.querySelector(".go-to-checkout");

function displayGameDetails(gameDetails) {
    const cart = document.querySelector(".cart-items");
    const cartSummary = document.querySelector(".cart-summary");
    const cartItems = [];
    gameDetails.forEach(function (game) {
        cart.innerHTML += `<div class="cart-item" data-game-id="${game.id}">
        <img src="${game.images[0].src}" alt="Game cover for ${game.name}">
        <div class="product-name">
            <a href="games/game.html?id=${game.id}">
                <h2>${game.name}</h2>
            </a>
            <div class="d-key"><i class="fa-solid fa-key"></i> Digital Key</div>
        </div>
        <div class="quantity">
            <h2 class="quantity-number">1</h2>
        </div>
        <div class="product-price">
            <h2>$${game.price}</h2>
        </div>
    </div>`
        cartItems.push(game);
    });

    if (!cartItems.length) {
        cart.innerHTML = `<div class="cart-item">Your cart is empty</div>`;
        clearCartButton.style.display = "none";
        goToCheckout.style.display = "none";
        cartSummary.style.marginBottom = "40px";
    }

    const { vat, total } = calculateTotal(cartItems);

    cartSummary.innerHTML = `<input class="promo-code" type="text" name="promo-code" placeholder="Got a promo code?" aria-label="Promo code input">
    <div class="total-price">
        <div class="left">
            <h2 class="vat-n">VAT:</h2>
            <h2 class="total-n">Total incl. VAT:</h2>
        </div>
        <div class="right">
            <h2 class="vat-price">$${vat}</h2>
            <h2 class="the-total">$${total}</h2>
        </div>
    </div>`;
}


const storedGameIds = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const fetchPromises = storedGameIds.map((gameId) => fetchGameDetails(gameId));

Promise.all(fetchPromises)
    .then((gameDetails) => {
        const validGameDetails = gameDetails.filter((details) => details !== null);
        displayGameDetails(validGameDetails);
    })
    .catch((error) => {
        console.error("Error fetching game details:", error);
    });


function clearCart() {
    localStorage.removeItem("shoppingCart");

    const cart = document.querySelector(".cart-items");

    cart.innerHTML = `<div class="cart-item">
        Your cart is empty
        </div>`;
}

clearCartButton.addEventListener("click", () => {
    clearCart();
    location.reload(); 
});