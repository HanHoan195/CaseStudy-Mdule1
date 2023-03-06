class Product {
    constructor(productId, productName, quantity, price, image) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.image = image;      

    }
}

var products = [];
const key_data = "product_data";
const sort_asc = "asc";
const sort_desc = "desc";

// localStorage
function init() {
    if (getData(key_data) == null) {
        products = [
            new Product(1, "Tai nghe E_DRA", 5, 349000, "image/d1.jpg"),
            new Product(2, "Màn hình cong MSI", 5, 5190000, "image/d2.png"),
            new Product(3, "Máy in laser", 5, 3190000, "image/d3.jpg"),
            new Product(4, "Loa Logistic ", 5, 3890000, "image/d6.jpg"),
            new Product(5, "Laptop ASUS", 5, 18900000, "image/d5.png"),
        ]
        setData(key_data, products);
    }
    else {
        products = getData(key_data);
    }
}

// function storge:
function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// renderProduct(xuất sp)
function renderProduct() {
    let tbProduct = document.querySelector('.table>tbody');
    let htmls = products.map(function (product) {
        return `
            <tr id="tr_${product.productId}">
                <td>DS-${product.productId}</td>
                <td class="tex-left">${product.productName}</td>
                <td class="text-right">${product.quantity}</td>
                <td class="text-right">${formatCurrency(product.price)}</td> 
                <td class="text-right">${formatCurrency(product.price * product.quantity)}</td>
                <td id="action_${product.productId}" class="text-right">
                    <button class="btn btn-warning" onclick="change(${product.productId})">Edit</button>
                    <button class="btn btn-primary d-none" onclick="update(${product.productId})">Update</button>
                    <button class="btn btn-warning d-none" onclick="cancel(${product.productId})">Cancel</button>
                    <button class="btn btn-danger" onclick="remove(${product.productId})">Delete</button>
                </td>
             </tr>
        `;
    })
    tbProduct.innerHTML = htmls.join("");
    document.querySelector("#totalAmount").innerHTML = totalAmount();
}
function totalAmount() {
    let totalAmount = products.reduce(function (total, pdt) {
        return total + pdt.quantity;
    }, 0)
    return totalAmount;
}

// format Currency
function formatCurrency(number) {
    // console.log(number);
    return number.toLocaleString('vi', { style: 'currency', currency: 'VND' }); // hàm đổi tiền
}


// add product
function addProduct() {
    let productName = document.querySelector("#productName").value;
    if (!validation(productName)) {
        alert("Product name is required!");
        return;
    }
    let quantity = Number(document.querySelector("#quantity").value);
    let price  = Number(document.querySelector("#price").value) ;
    let image = document.querySelector("#imageUrl").value;
    let productId = getLastestId() + 1;
    let newProduct = new Product(productId, productName, quantity, price, image);

    products.push(newProduct);
    setData(key_data, products);
    renderProduct();
    resetForm();

}

//find maxid
function getLastestId() {
    let productTemp = [...products];
    let maxId = productTemp.sort(function (pdt1, pd2t) {
        return pd2t.productId - pdt1.productId
    })[0].productId
    return maxId;
}

function resetForm() {
    document.querySelector("#productName").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#price").value = "";
}

function validation(field) {
    return field != null && field.trim() != '';
}

function remove(productId) {
    let confirmed = window.confirm("Bạn có muốn xóa không?");
    if (confirmed) {
        let position = products.findIndex(function (pdt) {
            return pdt.productId == productId;
        })
        products.splice(position, 1);
        setData(key_data, products);
        renderProduct();
    }

}

function sort(direct) {
    if (direct == sort_asc) {
        products.sort(function (pdt1, pdt2) {
            return pdt1.price - pdt2.price;
        })
    }
    else {
        products.reverse;
    }
    renderProduct();
}

function getProductById(pdtId) {
    return products.find(function (pdt) {
        return pdt.productId == pdtId;
    })
}

function change(pdtId) {
    let tr = document.getElementById(`tr_${pdtId}`);
    let product = getProductById(pdtId)
    tr.children[1].innerHTML = `<input class='form-control-md text-left' type='text' value ='${product.productName}'/>`;
    tr.children[2].innerHTML = `<input class='form-control-md text-right' type='text' value ='${product.quantity}'/>`;
    tr.children[3].innerHTML = `<input class='form-control-md text-right' type='text' value ='${product.price}'/>`;
    let action = document.getElementById(`action_${pdtId}`);
    action.children[0].classList.add('d-none');
    action.children[1].classList.remove('d-none');
    action.children[2].classList.remove('d-none');
}

function cancel(pdtId) {
    let tr = document.getElementById(`tr_${pdtId}`);
    let product = getProductById(pdtId)
    tr.children[1].innerHTML = product.productName;
    tr.children[2].innerHTML = product.quantity;
    tr.children[3].innerHTML = formatCurrency(product.price);
    let action = document.getElementById(`action_${pdtId}`);
    action.children[0].classList.remove('d-none');
    action.children[1].classList.add('d-none');
    action.children[2].classList.add('d-none');
}

function update(pdtId) {
    let tr = document.getElementById(`tr_${pdtId}`);
    let product = getProductById(pdtId);
    let newProductName = tr.children[1].children[0].value;
    let newQuantity = Number(tr.children[2].children[0].value);
    let newPrice = Number(tr.children[3].children[0].value);
    product.productName = newProductName;
    product.quantity = newQuantity;
    product.price = newPrice;
    product.amount = product.quantity * product.price;
    tr.children[4].innerHTML = formatCurrency(product.amount);
    setData(key_data, products);
    cancel(pdtId);
    document.querySelector("#totalAmount").innerHTML = totalAmount();
}
function ready() {
    init();
    renderProduct();
}

ready();


