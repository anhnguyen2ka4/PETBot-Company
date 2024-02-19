// ================ OurProducts ==============

// MenuButtons show Product
function showItems(value) {
    let buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
        if (value.toUpperCase() == btn.innerText.toUpperCase()) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".item");
    elements.forEach((element) => {
            if (element.classList.contains(value)) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        }
    )
}


// Declare Variable 
let listProductHTML = document.querySelector('.products-container');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML
        // Add New Data
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item','hide',product.show);
                newProduct.innerHTML = 
                `<div class="image">
                    <img src="${product.image}" alt="image">
                    <div class="product__img-hover">
                        <i class="fa-brands fa-searchengin"
                        title="Quick Review">
                        </i>
                        <i class="fa-solid fa-cart-arrow-down"
                        title="Add to Cart">
                        </i>
                        <i class="fa-regular fa-heart"
                        title="Save to Favourite">
                        </i>
                    </div>
                </div>
                <div class="materialAndCapacity">
                        <div class="material">Material: ${product.material}</div>
                        <div class="capacity">Capacity: ${product.capacity}</div>
                    </div>
                    <div class="price">Price: <b><u>$${product.price}</u></b></div>
                    <h2>${product.name}</h2>
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                    </div>
                <button class="addCart">Add To Cart</button>`;
                    
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
    const addToCart = (product_id) => {
        let product = products.find((value) => value.id == product_id);
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        if(cart.length <= 0){
            cart = [{
                product_id: product_id,
                name: product.name,
                price: product.price,
                image: product.image,
                capacity: product.capacity,
                material: product.material,
                quantity: 1
            }];
        }else if(positionThisProductInCart < 0){
            cart.push({
                product_id: product_id,
                name: product.name,
                price: product.price,
                image: product.image,
                capacity: product.capacity,
                material: product.material,
                quantity: 1
            });
        }else{
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }
        addCartToHTML();
        addCartToMemory();
    }
    
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                    ${info.name} </br>
                    <div class="box-name">
                        Material: ${info.material} </br>
                        Capacity: ${info.capacity}
                    </div>
                </div>
                <div class="totalPrice">$${Number((info.price* item.quantity)).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('.././JS/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
        showItems("all");


        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();

// Testimonials
let feadbackIndex = 1;
showfeadbacks(feadbackIndex);

function showFeadback(n) {
  showfeadbacks(feadbackIndex += n);
}
function showfeadbacks(n) {
  let i;
  let feadbacks = document.getElementsByClassName("feedback");
  if (n > feadbacks.length) {feadbackIndex = 1}    
  if (n < 1) {feadbackIndex = feadbacks.length}
  for (i = 0; i < feadbacks.length; i++) {
    feadbacks[i].style.display = "none";  
  }
  feadbacks[feadbackIndex-1].style.display = "block";  
}

function toggleSearchForm() {
    var searchForm = document.getElementById("showSearch");
    if (searchForm.style.display === "none") {
        searchForm.style.display = "block";
    } else {
        searchForm.style.display = "none";
    }
  }
