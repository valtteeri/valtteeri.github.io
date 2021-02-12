let carts = document.querySelectorAll('.shop-item-button');

let products =[
    {
        name: 'Philips Hue GU10',
        tag: 'philipshuegu10',
        price: 142.00,
        inCart: 0
    },
    {
        name: 'NanoLeaf Light Panels',
        tag: 'nanoleaflightpanels',
        price: 120.00,
        inCart: 0
    },
    {
        name: 'Philips Hue Lightstrips Plus',
        tag: 'philipshuelightstripsplus',
        price: 69.00,
        inCart: 0
    },
    {
        name: 'LIFX Beam',
        tag: 'lifxbeam',
        price: 149.00,
        inCart: 0
    },
    {
        name: 'Nanoleaf Shapes Hexagon',
        tag: 'nanoleafshapeshexagon',
        price: 130.00,
        inCart: 0
    },
    {
        name: 'Philips Hue Play HDMI Sync Box',
        tag: 'philipshueplayhdmisyncbox',
        price: 218.00,
        inCart: 0
    },
    {
        name: 'Philips Adore HUE White Ambiance',
        tag: 'philipsadorehuewhiteambiance',
        price: 129.00,
        inCart: 0
    },
    {
        name:'Philips Hue Flourish Pendant Light',
        tag: 'philipshueflourishpendantlight',
        price: 120.00,
        inCart: 0
    },
    {
        name: 'Philips Hue Play Light bar',
        tag: 'philipshueplaylightbar',
        price: 99.00,
        inCart: 0
    },
    {
        name: 'Ledvance Smart+ Panel',
        tag: 'ledvancesmart+panel',
        price: 169.00,
        inCart: 0
    },
    {
        name: 'Philips Hue Bridge',
        tag: 'philipshuebridge',
        price: 39.00,
        inCart: 0
    },
    {
        name: 'WiZ Smart lamp',
        tag: 'wizsmartlamp',
        price: 18.00,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cartnum span').textContent = productNumbers;
    }
}

function cartNumbers(product, action){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if( action == "decrease"){
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cartnum span').textContent = productNumbers - 1;
    } else if ( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers  + 1);
        document.querySelector('.cartnum span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cartnum span').textContent =  1;
    }

    setItems(product);
}


function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action){
    let cartCost = localStorage.getItem('totalCost');
    if( action == "decrease"){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost - product.price);

    }else if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
    localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="cart-row">
            <div class = "product">
            <i class="far fa-times-circle"></i>
            <img src="${item.tag}.png" width="100" height="100">
            <span>${item.name}</span>
            </div>
            <div class="delete"></div>
            <div class ="prices">${item.price}€</div>
            <div class ="quantity">
            <i class="fas fa-arrow-circle-left decrease"></i>
            <span>&nbsp;${item.inCart}&nbsp;</span>
            <i class="fas fa-arrow-circle-right increase"></i> </td>
            </div>
            <div class="total">
            ${item.inCart * item.price}€</div>
            </div>
            </div>
            `
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h8 class="basketTotalTitle">
                Basket total
                </h8>
                <h8 class="basketTotalTitle">
                    ${cartCost}€
                </h8>
        `;
    }
        deleteButtons();
        manageQuantity();
}

function deleteButtons(){
        let deleteButtons = document.querySelectorAll('.product i');
        let productName;
        var productNumbers = localStorage.getItem('cartNumbers');
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        let cartCost = localStorage.getItem('totalCost');

        for(let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click', () => {
                productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
                console.log(productName);

                localStorage.setItem('cartNumbers', productNumbers - (cartItems[productName].inCart));
                localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart) );
                delete cartItems[productName];
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));

                displayCart();
                onLoadCartNumbers();
            });
        }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let currentQuantity = 0;
    let currentProduct = "";
    for(let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', ()=>{
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g , '');
            console.log(currentProduct);
            if( cartItems[currentProduct].inCart > 1){
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        })
    }
    for(let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', ()=>{
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g , '');
            console.log(currentProduct);
            
                cartItems[currentProduct].inCart += 1;
                cartNumbers(cartItems[currentProduct]);
                totalCost(cartItems[currentProduct]);
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
    
    )}

}

onLoadCartNumbers();
displayCart();
