let shoppingCart = [];

function saveCartToLocalStorage(cartData) {
    const cartDataJson = JSON.stringify(cartData);
    localStorage.setItem("shoppingCart", cartDataJson);
}

function initializeShoppingCart() {
    const cartDataJson = localStorage.getItem("shoppingCart");
    if (cartDataJson) {
        shoppingCart = JSON.parse(cartDataJson);
    }
}

initializeShoppingCart();