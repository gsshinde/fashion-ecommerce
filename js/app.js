const loader = document.querySelector('#loader');
const cartBadge = document.querySelector('.shopping-cart-badge span');
//const _url = 'http://127.0.0.1:5500/';
const _url = 'https://fashion-dot.netlify.app/';

function onLoad() {
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
    if (shoppingCart.totalCount() > 0) {
        cartBadge.style.visibility = 'visible';
        cartBadge.textContent = shoppingCart.totalCount();
    } else {
        cartBadge.style.visibility = 'hidden';
    }
}

function onLoadViewItems() {
    setTimeout(() => {
        loader.style.display = 'none';
        if (localStorage.getItem('productName') != null) {
            const inforGraphProductName = document.querySelector('.view-product .info-graph span');
            const productName = document.querySelector('.view-product .view-product-items .right h1');
            const productImg = document.querySelectorAll('.view-product .view-product-items .left img');
            const productPrice = document.querySelector('.view-product .view-product-items .right .price h2 span');
            const productRatings = document.querySelector('.view-product .view-product-items .right .view-iteam-ratings');

            productImg.forEach(item => {
                item.src = localStorage.getItem('productImg')
            });
            inforGraphProductName.innerHTML = localStorage.getItem('productName');
            productName.innerHTML = localStorage.getItem('productName');
            productPrice.textContent = localStorage.getItem('productPrice');
            productRatings.innerHTML = localStorage.getItem('productRatings');
        } else {
            document.location.href = _url + 'index.html';
        }
    }, 1000);
    if (shoppingCart.totalCount() > 0) {
        cartBadge.style.visibility = 'visible';
        cartBadge.textContent = shoppingCart.totalCount();

    } else {
        cartBadge.style.visibility = 'hidden';
    }
}


const OnclickHamburger = () => {
    const burger = document.querySelector('.hamburger')
    const navbar = document.querySelector('header .navbar .navbar-nav');
    if (burger != null) {
        burger.addEventListener('click', function(e) {
            navbar.classList.toggle('active');
        })
    }
}

const OnClickViewItem = () => {
    const viewItem = document.querySelectorAll('.action-links .view-item')
    viewItem.forEach(item => {
        item.addEventListener('click', function(e) {
            const parent = item.parentElement;
            const mParent = parent.parentElement;
            const gParent = mParent.parentElement;

            const productName = gParent.querySelector('.product-item .product-content h5').innerHTML;
            const productImg = gParent.querySelector('.product-item .product-img img').getAttribute('src');
            const productPrice = gParent.querySelector('.product-item .product-content .price').textContent;
            const productRatings = gParent.querySelector('.product-item .product-content .ratings').innerHTML;

            localStorage.setItem('productName', productName);
            localStorage.setItem('productImg', productImg);
            localStorage.setItem('productPrice', productPrice);
            localStorage.setItem('productRatings', productRatings);

            document.location.href = _url + 'view-item.html';
        })
    });

}

var orderDetails = (function() {
    orders = [];

    // Constructor
    function Order(name, price, count, img, size, final_price, qty, status, date, order_no) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.img = img;
        this.size = size;
        this.final_price = final_price;
        this.qty = qty;
        this.status = status;
        this.date = date;
        this.order_no = order_no;
    }

    var objOrder = {};

    objOrder.addItemToOrderDetails = function(name, price, count, img, size, final_price, qty, status, date, order_no) {
        var item = new Order(name, price, count, img, size, final_price, qty, status, date, order_no);
        orders.push(item);
        sessionStorage.setItem('orderDetails', JSON.stringify(orders));
    }

    function loadOrderDetails() {
        orders = JSON.parse(sessionStorage.getItem('orderDetails'));
    }
    if (sessionStorage.getItem("orderDetails") != null) {
        loadOrderDetails();
    }

    return objOrder;
})();

var orderConfirmDetails = (function() {
    ordersConfirm = [];

    // Constructor
    function OrderConfirm(name, price, count, img, size, final_price, qty, status, date, order_no) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.img = img;
        this.size = size;
        this.final_price = final_price;
        this.qty = qty;
        this.status = status;
        this.date = date;
        this.order_no = order_no;
    }

    var objOrderConfirm = {};

    objOrderConfirm.addItemToOrderConfirmDetails = function(name, price, count, img, size, final_price, qty, status, date, order_no) {
        for (var item in ordersConfirm) {
            if (orders[item].name === name) {
                orders[item].count++;
                sessionStorage.setItem('orderConfirmDetails', JSON.stringify(ordersConfirm));
                return;
            }
        }
        var item = new OrderConfirm(name, price, count, img, size, final_price, qty, status, date, order_no);
        ordersConfirm.push(item);
        sessionStorage.setItem('orderConfirmDetails', JSON.stringify(ordersConfirm));
    }

    function loadOrderConfirmDetails() {
        orders = JSON.parse(sessionStorage.getItem('orderConfirmDetails'));
    }
    if (sessionStorage.getItem("orderConfirmDetails") != null) {
        loadOrderConfirmDetails();
    }

    return objOrderConfirm;
})();

var shoppingCart = (function() {

    cart = [];

    // Constructor
    function Item(name, price, count, img, size, final_price, qty, status) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.img = img;
        this.size = size;
        this.final_price = final_price;
        this.qty = qty;
        this.status = status;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count, img, size, final_price, qty, status) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count, img, size, final_price, qty, status);
        cart.push(item);
        saveCart();
    }

    // Set count from item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();

const OnClickAddToCart = () => {
    const cartBtn = document.querySelectorAll('.action-links .add-to-cart');
    cartBtn.forEach(item => {
        item.addEventListener('click', function(e) {
            const parent = item.parentElement;
            const mParent = parent.parentElement;
            const gParent = mParent.parentElement;

            const productName = gParent.querySelector('.product-item .product-content h5').innerHTML;
            const productImg = gParent.querySelector('.product-item .product-img img').getAttribute('src');
            const productPrice = gParent.querySelector('.product-item .product-content .price').textContent;

            addItemsToCart(productName, productPrice, 1, productImg, 'S', 1, 'Pending');
        })
    });
}

const OnClickAddToCartViewItems = () => {
    const viewItemsCartBtn = document.querySelector('.view-buttons .btn-addtocart');
    if (viewItemsCartBtn != null) {
        viewItemsCartBtn.addEventListener('click', function(e) {
            if ($('.size a').hasClass('active-size')) {
                const parent = viewItemsCartBtn.parentElement;
                const mParent = parent.parentElement;
                const gParent = mParent.parentElement;

                const productName = gParent.querySelector('.view-product-items .right h1').innerHTML;
                const productImg = gParent.querySelector('.view-product-items .left .view-product-img-right img').getAttribute('src');
                const productPrice = gParent.querySelector('.view-product-items .right .price h2 span').textContent;
                const size = gParent.querySelector('.view-product-items .right .size .active-size').textContent;

                addItemsToCart(productName, productPrice, 1, productImg, size, 1, 'Pending');
            } else {
                const sizeToaster = document.querySelector('.select-size');
                sizeToaster.classList.add('show-exist-toaster');
                setTimeout(() => {
                    sizeToaster.classList.remove('show-exist-toaster');
                }, 5000);
            }
        });
    }
}

function addItemsToCart(name, price, count, img, size, qty, status) {
    var cartItems = JSON.parse(sessionStorage.getItem('shoppingCart'));
    if (cartItems != null)
        var item = cartItems.filter(x => x.name === name)
    else
        var item = [];

    if (item.length > 0) {
        const toaster = document.querySelector('.toaster-exist-item');
        toaster.classList.add('show-exist-toaster');
        setTimeout(() => {
            toaster.classList.remove('show-exist-toaster');
        }, 5000);
    } else {
        shoppingCart.addItemToCart(name, price, count, img, size, 0, qty, status);
        cartBadge.style.visibility = 'visible';
        cartBadge.textContent = shoppingCart.totalCount();
        const toaster = document.querySelector('.toaster');
        toaster.classList.add('show');
        setTimeout(() => {
            toaster.classList.remove('show');
        }, 5000);
    }
}

function onLoadCheckoutCart() {
    const emptyCart = document.querySelector('.empty-cart');
    const checkoutCart = document.querySelector('.checkout-cart');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
    showCartBadge();
}

OnClickRemoveItemFromCart = () => {
    if (shoppingCart.totalCount() > 0) {
        const cartList = document.querySelector('.cart-items-list');
        if (cartList != null) {
            $('.cart-items-list').on('click', '.remove-cart-item', function(event) {
                var parent = $(this).parent().parent();
                var productName = parent[0].childNodes[1].firstChild.childNodes[0].innerHTML;
                shoppingCart.removeItemFromCart(productName);
                parent.remove();
                displayCart();
                showCartBadge();
            });
        }
    }
}

function displayCart() {
    var _cartItems = shoppingCart.listCart();
    var innerCart = '';
    var _total = 0;
    var _size;
    var _name
    var _totalItems = shoppingCart.totalCount();
    _cartItems.forEach(cartItem => {
        var qty = cartItem['qty'];
        var _cartItem = cartItem;
        var _img = _cartItem['img'];
        _name = _cartItem['name'];
        var _price = _cartItem['price'] * qty;
        _size = _cartItem['size'];

        innerCart += "<div class='cart-items'><div class='product-img'><img src='" + _img + "'></div>" +
            "<div class='product-details row justify-between'><div class='name'><h5>" + _name + "</h5>" +
            "<h6>Trendy wears on women fashion</h6><p>Sold by: Women Fashion</p><div class='cart-select row align-items-center'>" +
            "<div class='size'><label>Size</label><br><select id='" + _name.replace(' ', '').replace(' ', '') + "'><option value='S'>S</option><option value='M'>M</option>" +
            "<option value='L'>L</option><option value='XL'>XL</option></select></div><div class='quantity'><label>Qty</label><br>" +
            "<select id='product-qty' class='" + _name.replace(' ', '').replace(' ', '') + "1''><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option>" +
            "<option value='5'>5</option></select></div></div></div><div class='price row'><i style='padding-top: 0.1rem;' class='fa fa-rupee'></i>" + _price + "</div></div>" +
            "<div class='remove'><a href='#' class='remove-cart-item'>Remove</a></div><div class='wishlist'><a href='#'>Move To Wishlist</a></div></div>";

        _total = +_total + +_price;
    });
    const cartItemList = document.querySelector('.cart-items-list');
    const totalItems = document.querySelector('.shopping-cart-total h4 .total-items-count');
    const total = document.querySelector('.shopping-cart-total h4 .total-price');
    const sidetotal = document.querySelector('.bag-total p span');
    const grandtotal = document.querySelector('.total h5 span');
    cartItemList.innerHTML = innerCart;
    totalItems.textContent = _totalItems;
    total.textContent = _total;
    sidetotal.textContent = _total;
    grandtotal.textContent = _total;

    _cartItems.forEach(cart => {
        var _name1 = cart['name'];
        var _size1 = cart['size'];
        var _qty_select = cart['name'];
        var _qty = cart['qty'];

        _name1 = _name1.replace(' ', '').replace(' ', '');
        _name1 = '#' + _name1;
        _qty_select = _qty_select.replace(' ', '').replace(' ', '');
        _qty_select = '.' + _qty_select + 1;

        $(_name1).val(_size1).attr("selected", "selected");
        $(_qty_select).val(_qty).attr("selected", "selected");
    });
}

function showCartBadge() {
    const emptyCart = document.querySelector('.empty-cart');
    const checkoutCart = document.querySelector('.checkout-cart');
    if (shoppingCart.totalCount() > 0) {
        checkoutCart.style.display = 'block';
        emptyCart.style.display = 'none';
        cartBadge.style.visibility = 'visible';
        cartBadge.textContent = shoppingCart.totalCount();
        displayCart();
    } else {
        emptyCart.style.display = 'block';
        checkoutCart.style.display = 'none';
        cartBadge.style.visibility = 'hidden';
    }
}

OnClickAddToWishlist = () => {
    const addToWishist = document.querySelectorAll('.action-links .add-to-wishlist');
    addToWishist.forEach(link => {
        link.addEventListener('click', function(e) {
            const wishlistToaster = document.querySelector('.toaster-wishlist');
            wishlistToaster.classList.add('show-exist-toaster');
            setTimeout(() => {
                wishlistToaster.classList.remove('show-exist-toaster');
            }, 5000);
        })
    });
}

OnClickSize = () => {
    const sizeAnchor = document.querySelectorAll('.size a');
    if (sizeAnchor.length > 0) {
        $('.size').on('click', 'a', function(e) {
            $(this).toggleClass('active-size').siblings().removeClass('active-size');
        })
    }
}

OnChangeQty = () => {
    const cartItemList = document.querySelector('.cart-items-list');
    if (cartItemList != null) {
        $(function() {
            $('.cart-items-list').on('change', '#product-qty', function(event) {
                var qty = $('option:selected', this).text();
                var productName = $(this).parent().parent().parent()[0].childNodes[0].innerText;

                var cartItems = JSON.parse(sessionStorage.getItem('shoppingCart'));
                var item = cartItems.filter(x => x.name === productName);
                var _price = item[0].price;

                var parent = $(this).parent().parent().parent().parent()[0].childNodes[1];
                parent.innerHTML = '<i class="fa fa-rupee"></i>' + qty * _price;

                var cartItemListDiv = $('.cart-items-list')[0].childNodes;
                var _total = 0;
                cartItemListDiv.forEach(item => {
                    _total += +item.childNodes[1].childNodes[1].innerText;
                });
                document.querySelector('.total-price').innerHTML = _total;
                document.querySelector('.bag-total p span').innerHTML = _total;
                document.querySelector('.total h5 span').innerHTML = _total;

                var p_name = item[0].name;
                var p_price = item[0].price;
                var p_img = item[0].img;
                shoppingCart.removeItemFromCart(p_name);
                shoppingCart.addItemToCart(p_name, p_price, 1, p_img, 'S', (qty * _price), qty, 'Pending');
            });
        });
    }
}

OnClickPlaceOrder = () => {
    const btnPlaceOrder = document.querySelector('.btn-place-order');
    if (btnPlaceOrder != null) {
        btnPlaceOrder.addEventListener('click', function(e) {
            if (sessionStorage.getItem('username') != null) {
                document.location.href = _url + 'order.html';
            } else {
                document.location.href = _url + 'login.html';
            }
        });
    }
}

OnClickOrder = () => {
    const loginBtn = document.querySelector('.btn-login');
    const invalidUserPwdToaster = document.querySelector('.invalid-credentials');

    if (loginBtn != null) {
        loginBtn.addEventListener('click', function(e) {
            const username = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;
            if (username == 'user' && password == 'user') {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                document.location.href = _url + 'index.html';
            } else {
                invalidUserPwdToaster.classList.add('show');
                setTimeout(() => {
                    invalidUserPwdToaster.classList.remove('show');
                }, 5000);
            }
        });
    }
}

OnLogin = () => {
    const loginDiv = document.querySelector('.login-div');
    const logoutDiv = document.querySelector('.logout-div');
    const loginAvtar = document.querySelector('.user-avtar');
    if (sessionStorage.getItem('username') != null) {
        loginDiv.style.display = 'none';
        logoutDiv.style.display = 'flex';
        loginAvtar.style.display = 'block';
    } else {
        loginDiv.style.display = 'flex';
        logoutDiv.style.display = 'none';
        loginAvtar.style.display = 'none';
    }
}

OnLogout = () => {
    const logout = document.querySelector('.logout-div a');
    if (logout != null) {
        logout.addEventListener('click', function(e) {
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('password');
            OnLogin();
            document.location.href = _url + 'index.html';
        });
    }
}

OnClickUser = () => {
    const userAvtar = document.querySelector('.user-avtar');
    if (userAvtar != null) {
        userAvtar.addEventListener('click', function(e) {
            document.location.href = _url + 'order-details.html';
        })
    }
}

function onOrderLoad() {
    var cartItems = JSON.parse(sessionStorage.getItem('shoppingCart'));
    const orderTotal = document.querySelector('.order .order-items .right .price-details .bag-total p span');
    const finalTotal = document.querySelector('.order .order-items .right .price-details .total h5 span');
    if (cartItems != null && orderTotal != null) {
        var _finalTotal = 0;
        cartItems.forEach(item => {
            if (item['final_price'] == 0) {
                _finalTotal += +item['price'];
            } else {
                _finalTotal += +item['final_price'];
            }
        });
        orderTotal.textContent = _finalTotal;
        finalTotal.textContent = _finalTotal;
    }

    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
    if (shoppingCart.totalCount() > 0) {
        cartBadge.style.visibility = 'visible';
        cartBadge.textContent = shoppingCart.totalCount();
    } else {
        cartBadge.style.visibility = 'hidden';
    }
}

OnClickFinalOrderNow = () => {
    var date = new Date();
    var temp_date = date + '';
    const finalOrder_Btn = document.querySelector('.btn-place-order-final');
    if (finalOrder_Btn != null) {
        finalOrder_Btn.addEventListener('click', function(e) {
            var _id = '#' + GenerateOrderID(11);
            debugger
            var cartItems = JSON.parse(sessionStorage.getItem('shoppingCart'));
            sessionStorage.removeItem('orderConfirmDetails');
            cartItems.forEach(item => {
                var count = item.count;
                var final_price = item.final_price;
                var p_name = item.name;
                var p_price = item.price;
                var p_img = item.img;
                var qty = item.qty;
                var size = item.size;
                orderDetails.addItemToOrderDetails(p_name, p_price, count, p_img, size, final_price, qty, 'Order Completed', temp_date.substring(3, 25), _id);
                orderConfirmDetails.addItemToOrderConfirmDetails(p_name, p_price, count, p_img, size, final_price, qty, 'Order Completed', temp_date.substring(3, 25), _id);
            });
            sessionStorage.removeItem('shoppingCart');
            document.location.href = _url + 'order-confirmation.html';
        });
    }
}

function GenerateOrderID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function onOrderConfirmationLoad() {
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
    if (shoppingCart.totalCount() > 0) {
        cartBadge.style.visibility = 'visible';
        cartBadge.textContent = shoppingCart.totalCount();
    } else {
        cartBadge.style.visibility = 'hidden';
    }

    const orderNo = document.querySelector('.order-no');
    const orderDate = document.querySelector('.order-date');
    const ordersTotal = document.querySelector('.order-total span');
    const orderDetailsHtml = document.querySelector('.order-confirm-items');

    var _orderDetails = JSON.parse(sessionStorage.getItem('orderConfirmDetails'));
    orderNo.textContent = _orderDetails[0].order_no;
    orderDate.textContent = _orderDetails[0].date;

    var _orderTotal = 0;
    var _singleOrder = 0
    var innerOrderDetails = '';
    _orderDetails.forEach(item => {
        if (item.final_price == 0) {
            _orderTotal += +item.price;
            _singleOrder = +item.price;
        } else {
            _orderTotal += +item.final_price;
            _singleOrder = +item.final_price;
        }
        innerOrderDetails += "<div class='order-confirm-item row'><div class='left'><img src='" + item.img + "'></div>" +
            "<div class='right'><h4>" + item.name + "</h4><h6>Qty - &nbsp; " + item.qty + "</h6>" +
            "<h6>Total - &nbsp; <i class='fa fa-rupee'></i>" + _singleOrder + "</h6></div></div>";
    });

    ordersTotal.textContent = _orderTotal;
    orderDetailsHtml.innerHTML = innerOrderDetails;
}

function onOrderDetailsLoad() {
    var orderedDetails = JSON.parse(sessionStorage.getItem('orderDetails'));
    const orderedItems = document.querySelector('.ordered-items');
    const noOrderDetails = document.querySelector('.no-order-details');
    const orderedItms = document.querySelector('.ordered-items');
    const previousH = document.querySelector('.previous-order-h1');
    var orderedInnerHtml = '';
    var _orderTotal = 0;
    if (orderedDetails != null && orderedItems != null) {
        noOrderDetails.style.display = 'none';
        orderedItms.style.display = 'grid';
        previousH.style.display = 'grid';
        orderedDetails.forEach(item => {
            if (item.final_price == 0) {
                _orderTotal = +item.price;
            } else {
                _orderTotal = +item.final_price;
            }

            orderedInnerHtml += "<div class='ordered-item row'><div class='left'><img src='" + item.img + "'></div>" +
                "<div class='right'><h4>" + item.name + "</h4><h6>Qty - &nbsp; <strong>" + item.qty + "</strong></h6>" +
                "<h6>Total - &nbsp; <i class='fa fa-rupee'></i><strong>" + _orderTotal + "</strong></h6>" +
                "<h6>Date - &nbsp; <strong>" + item.date + "</strong></h6><h6>Order No. - <strong>" + item.order_no + "</strong></h6></div></div>";
        });
    } else {
        noOrderDetails.style.display = 'grid';
        orderedItms.style.display = 'none';
        previousH.style.display = 'none';
    }
    orderedItems.innerHTML = orderedInnerHtml;
}

OnclickHamburger();
OnClickViewItem();
OnClickAddToCart();
OnClickAddToCartViewItems();
OnClickRemoveItemFromCart();
OnClickAddToWishlist();
OnClickSize();
OnChangeQty();
OnClickPlaceOrder();
OnClickOrder();
OnLogin();
OnLogout();
OnClickUser();
onOrderLoad();
OnClickFinalOrderNow();