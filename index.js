// slide anh bia

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// function storge:
function getData(key){
  return JSON.parse(localStorage.getItem(key));
}

function setData(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}



function renderProductIndex() {
  let tbProduct = document.querySelector('#dealshock');
  let htmls = products.map(function(product){
      return  `
        <div class="column">
            <div class="card">
              <img src="${product.image}" alt="" style="width:100%" id="image">
              <div class="container">
                <h2>${product.productName}</h2>
                <p class="title">${product.price}</p>                  
                <p><button class="button">Mua/Buy</button></p>
              </div>
            </div>
          </div>
      `;
  })
  tbProduct.innerHTML = htmls.join("");
  // document.querySelector("#totalAmount").innerHTML = totalAmount();
}

//máy tính xách tay


function renderProductIndex() {
  let tbProduct = document.querySelector('#dealshock');
  let htmls = products.map(function(product){
      return  `
        <div class="column">
            <div class="card">
              <img src="${product.image}" alt="" style="width:100%" id="image">
              <div class="container">
                <h2>${product.productName}</h2>
                <p class="title">${formatCurrency(product.price)}</p>                  
                <p><button class="button">Mua/Buy</button></p>
              </div>
            </div>
          </div>
      `;
  })
  tbProduct.innerHTML = htmls.join("");
  // document.querySelector("#totalAmount").innerHTML = totalAmount();
}

init();
renderProductIndex();