if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

//tax variables
var taxRate = 0.08;
var shippingRate = 20.00;
var fadeTime = 300;

var cartItems;

function redraw() {
    if ( !cartItems ) {
        cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    }

    if ( cartItems == null ) {
        sessionStorage.setItem('cartItems', JSON.stringify([]));
        cartItems = [];
    }

    let cartItemsNode = document.getElementById('cart-items');
    while (cartItemsNode.firstChild) {
        cartItemsNode.removeChild(cartItemsNode.firstChild);
    }

    for (let itemName of cartItems) {
        let itemRow = makeCartRow(itemName);
        cartItemsNode.append(itemRow);
    }
}

function makeCartRow(itemName) {
    // <div class="cart-row">
    //     <div class="cart-item cart-column">
    //         <img class="cart-item-image" src="Images/Items/GypsumSand.jpg">
    //         <span class="cart-item-title">Gypsum Sand</span>
    //     </div>
    //     <span class="cart-price cart-column">$24.99</span>
    //     <div class="cart-quantity cart-column">
    //         <input class="cart-quantity-input" type="number" value="1">
    //         <button class="btn btn-danger" type="button">REMOVE</button>
    //     </div>
    // </div>
    let itemInfo = items.find(e => e.item == itemName);

    let rowDiv = document.createElement('div');
    rowDiv.className = 'cart-row';

    let cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item cart-column';

    let image = document.createElement('img');
    image.className = 'cart-item-image';
    image.src = itemInfo.image;

    let title = document.createElement('span');
    title.className = 'cart-item-title';
    title.textContent = itemName;

    cartItemDiv.append(image, title);
    rowDiv.append(cartItemDiv);

    let price = document.createElement('span');
    price.className = 'cart-price cart-column';
    price.textContent = "" + itemInfo.price;
    rowDiv.append(price);

    let quantity = document.createElement('div');
    quantity.className = 'cart-quantity cart-column';

    let quantityInput = document.createElement('input');
    quantityInput.className = 'cart-quantity-input';
    quantityInput.type = 'number';
    quantityInput.value = 1;

    let quantityButton = document.createElement('button');
    quantityButton.className = 'btn btn-danger';
    quantityButton.type = 'button';
    quantityButton.textContent = 'REMOVE';
    quantityButton.addEventListener('click', () => removeCartItem(itemName));

    quantity.append(quantityInput);
    quantity.append(quantityButton);
    rowDiv.append(quantity);

    return rowDiv;
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(itemName) {
    let index = cartItems.indexOf(itemName);
    cartItems.splice(index, 1);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    redraw();
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
		// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//Login-Register Form Variables
            var x = document.getElementById("login");
            var y = document.getElementById("register");
            var z = document.getElementById("btn");
            //Register Function
            function register(){
                x.style.left = "-400px";
                y.style.left = "50px"
                z.style.left= "110px";
            }
            //Login Function
            function login(){
                x.style.left = "50px";
                y.style.left = "450px"
                z.style.left= "0";
            }
            if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}