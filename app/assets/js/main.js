// SELECT ELEMENTS
const productsEl = document.querySelector(".shop-items");
const cartItemsEl = document.querySelector(".cart-items");
const empty = document.querySelector(".cart-empty");
const subtotalEl = document.querySelector(".card-title-amount");



// RENDER PRODUCT
function renderProducts(){
    products.forEach( (product) => {
        productsEl.innerHTML += `
            <div class="shop-item">
                <div class="shop-item-image" style="background-color: ${product.color};">
                    <img src="${product.image}" alt="">
                </div>
                <div class="shop-item-name">${product.name}</div>
                <div class="shop-item-description">
                    ${product.description}
                </div>
                <div class="shop-item-bottom">
                    <div class="shop-item-price">$${product.price}</div>
                    <div class="shop-item-button" onclick="addToCart(${product.id})">
                        <p id="addtocart">ADD TO CART</p>
                    </div>
                </div>
            </div>
        `
    })
}
renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];

updateCart();

// Add To Cart
function addToCart(id){
    
    // check if product already exist in cart
    if(cart.some((item) => item.id === id)){
        changeNumberOfUnits('plus', id)
    }else{
        const item = products.find( (product) => product.id === id );
        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    
    
    // const set = document.querySelector(".shop-item-button");
    // set.classList.add("inactive")
    // set.innerHTML = `<img class="check" src="app/assets/check.png" alt="">`
    
    updateCart();
    
        
}

// Update Cart
function updateCart(){
    renderCartItems();
    renderSubtotal();

    // Save Cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

// Render Cart Item
function renderCartItems(){
    cartItemsEl.innerHTML = "";
    cart.forEach( (item) => {
        cartItemsEl.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-left">
                    <div class="cart-item-image" style="${item.color};">
                        <div class="cart-item-image-block">
                            <img src="${item.image}" alt="">
                        </div>
                    </div>
                </div>
                <div class="cart-item-right">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-actions">
                        <div class="cart-item-count">
                            <div class="cart-item-count-button" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                            <div class="cart-item-count-number">${item.numberOfUnits}</div>
                            <div class="cart-item-count-button" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
                        </div>
                        <div class="cart-item-remove" onclick="removeItemCart(${item.id})">
                            <img src="app/assets/trash.png" class="cart-item-remove-icon" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}


// Change Number Of Units for an item
function changeNumberOfUnits(action, id){
    cart = cart.map( (item)=>{
        let numberOfUnits = item.numberOfUnits;

        if(item.id === id){
            if(action === 'minus' && numberOfUnits > 1){
                numberOfUnits--;  
            }else if(action === 'plus'){
                numberOfUnits++;
            }
        };

        return {
            ...item,
            numberOfUnits
        }
    })
    updateCart();
}

// Calculate and render subtotal
function renderSubtotal(){
    let totalPrice = 0

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
    })

    subtotalEl.innerHTML = ` $${totalPrice.toFixed(2)}`
}

// Remove item from cart
function removeItemCart(id){
    cart = cart.filter( (item) => item.id !== id )
    updateCart();
}



function generalCart(){
    if(cart.length === 0){
        empty.innerHTML = `<p class="cart-empty-text">Your cart is empty.</p>`
    }
}

generalCart()

