let product = [
    {
        name: "Album 1",
        tag: "album1",
        price: 15,
        inCart: 0
    },
    {
        name: "Album 2",
        tag: "album2",
        price: 25,
        inCart: 0
    },
    {
        name: "Album 3",
        tag: "album3",
        price: 30,
        inCart: 0
    },
    {
        name: "Album 4",
        tag: "album4",
        price: 20,
        inCart: 0
    }
]

// Get all elements that have the class "add-cart"
let carts = document.querySelectorAll('.add-cart')

// Loop through the products
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        // When clicked, it should say which productis being added to the cart
        cartNumbers(product[i]);
        totalCost(product[i]);
    })
}

// Function to say the number of products should be equal to your localStorage
function onLoadCartNumbers() {
    // Get item number
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    // Get item number
    let productNumbers = localStorage.getItem('cartNumbers');
    // Change it froma string to  number
    productNumbers = parseInt(productNumbers)
    
    if (productNumbers) {
        // Create a "cartNumbers" item that is in the localStorage that will hold the number of items in the cart
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else{
        // Create a "cartNumbers" item that is in the localStorage that will hold the number of items in the cart
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product)
}

function setItems(product) {
    // Get the "productsInCart" item that is in the localStorage
    let cartItems = localStorage.getItem('productsInCart');
    // Since the product is not in Javascript format
    cartItems = JSON.parse(cartItems);

    // If cartItems is not null (meaning there is something in the cart) then add anotehr of the same item
    // The else condition is saying that this is the first time you are putting the product in the cart.
    if (cartItems != null) {
        // This if statement is used when there is a product in the cart,and the user wants to add another item to the cart.
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        // Get the tag part of the arrays product
        cartItems = {
            [product.tag] : product
        }
    }

    // Say the we have 1 of product in the cart. Do it as a JSON.stringify because we want it as a JSON object
    // because if not it will say object:object
    // Create "productsInCart" item that will be in the localStorage and will hold the products that are in the cart
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Calculate total cost
function totalCost(product) {
    // Get the "totalCost" item that is in the localStorage
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("The product price is", product.price);
    console.log("My cart cost is", cartCost);

    // Check if the total cost is equal to null. If it is not null,
    // Then there is somethign in the cart already
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

// Function to see if there is somehting in the localStorage
function displayCart() {
    // Get the "productsInCart" item that is in the localStorage
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    // Get the "totalCost" item that is in the localStorage
    let cartCost = localStorage.getItem('totalCost');

    // Check if the product-container element in the html document is on the page because this js file
    // is shared with all the other html documents.
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';

        // When an item is added to cart, and the user checks the cart, all the items will be displayed there.
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="./Images/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="remove-circle"></ion-icon>
                <span>${item.inCart}</span>
                <button onclick="addQuantity()"><ion-icon class="increase" name="add-circle"></ion-icon></button>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            `
        });

        // Display the total of the entire cart.
        productContainer.innerHTML += `
            <div class="cartTotalContainer">
                <h4 class="cartTotalTitle">
                    Cart Total
                </h4>
                <h4 class="cartTotal">
                    $${cartCost}.00
                </h4>
        `
    }

}

function addQuantity() {
   
}

onLoadCartNumbers();
displayCart();