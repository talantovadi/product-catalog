let cards = document.querySelector(".cards");
let menu = document.querySelectorAll(".header__category li");
// console.log(menu)
let boxBasket = document.querySelector(".box_basket");
let btnBasket = document.querySelector(".btn_basket");
let btnClose = document.querySelector(".btn_close");
let countBasket = document.querySelector(".count_basket");
let priceBasket = document.querySelector(".price_basket");
let searchInput = document.querySelector(".search_input");
let basketItems = document.querySelector(".basket_items");

const dropdownBtn = document.querySelector(".dropdown_btn");
const dropdownMenu = document.querySelector(".dropdown_menu");
const dropdownText = document.querySelector(".dropdown_text");
const dropdownItems = document.querySelectorAll(".dropdown_menu li");

let category = "";

let arrBasket = [];

let allProducts = [];

let addToBasket = () => {
  let btnsBasketAdd = document.querySelectorAll(".btns_basket_add");
  // console.log(btnsBasketAdd);

  btnsBasketAdd.forEach((element) => {
    // console.log(element);

    element.addEventListener("click", () => {
      let findProduct = allProducts.find(
        (item) => item.id === +element.dataset.id,
      );
      // console.log(findProduct);

      let sameId = arrBasket.find((item) => item.id === findProduct.id);

      if (sameId) {
        sameId.counter = sameId.counter + 1;
      } else {
        findProduct.counter = 1;
        arrBasket = [...arrBasket, findProduct];
      }

      console.log(sameId);

      if (arrBasket.length > 9) {
        countBasket.textContent = "9+";
      } else {
        countBasket.textContent = arrBasket.length;
      }

      showBasket();
    });
  });
};

let showBasket = () => {
  basketItems.innerHTML = "";

  arrBasket.forEach((element) => {
    basketItems.innerHTML += `
        <div class="one_basket_card">

            <img src="${element.image || "img/placeholder.png"}" alt="img" onerror="this.onerror=null; this.src='img/placeholder.png'">
            
            <div class="basket_info">
                <h4>${element.title}</h4>
                <p>Quantity: ${element.counter}</p>
            </div>

  
            <h4 class="basket_price">Total: $${element.price * element.counter}</h4>
        </div>
        `;
  });

  //   dropdown.classList.remove('active');
};

let showProducts = () => {
  cards.innerHTML = "";
  fetch(
    `https://fakestoreapi.com/products/${category === "jewelery" ? "category/jewelery" : category === "electronics" ? "category/electronics" : category === "men's clothing" ? "category/men's clothing" : category === "women's clothing" ? "category/women's clothing" : ""}`,
  )
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;

      data.forEach((element) => {
        cards.innerHTML += `
            <div class="card">

                <div class="card__top">
                <img src="${element.image || "img/placeholder.png"}" alt="img" onerror="this.onerror=null; this.src='img/placeholder.png'">

                <div class="card__info">
                    <div class="card__df">
                        <h4>${element.title}</h4>
                        <h3>$${element.price}</h3>
                    </div>
                    <p>${element.category}</p>
                </div>
                </div>

                    <button class="btns_basket_add" data-id="${element.id}">Into a basket</button>
                
                
            </div>
            `;
      });

      addToBasket();
    });
};

showBasket();

menu.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();

    category = element.textContent.toLowerCase();

    menu.forEach((item) => {
      item.classList.remove("active");
      item.style.color = "black";
    });

    element.classList.add("active");
    element.style.color = "black";

    showProducts();
  });
});

btnBasket.addEventListener("click", () => {
  boxBasket.style.display = "block";
});

btnClose.addEventListener("click", () => {
  boxBasket.style.display = "none";
});

searchInput.addEventListener("input", (e) => {
  let text = e.target.value.toLowerCase();
  let filtered = allProducts.filter((item) => {
    return item.title.toLowerCase().includes(text);
  });

  cards.innerHTML = "";

  filtered.forEach((element) => {
    cards.innerHTML += `
        <div class="card">
            
            <div class="card__top">
                <img src="${element.image || "img/placeholder.png"}" alt="img" onerror="this.onerror=null; this.src='img/placeholder.png'">

                <div class="card__info">
                    <div class="card__df">
                        <h4>${element.title}</h4>
                        <h3>$${element.price}</h3>
                    </div>
                    <p>${element.category}</p>
                </div>
                </div>
                <button class="btns_basket_add" data-id="${element.id}">Into a basket</button>
            
        </div>
        `;
  });

  addToBasket();
});

dropdownBtn.addEventListener("click", () => {
  if (dropdownMenu.style.display === "block") {
    dropdownMenu.style.display = "none";
    dropdownBtn.parentElement.classList.remove("active");
  } else {
    dropdownMenu.style.display = "block";
    dropdownBtn.parentElement.classList.add("active");
  }
});

dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    dropdownText.textContent = item.textContent;

    dropdownMenu.style.display = "none";
    dropdownBtn.parentElement.classList.remove("active");

    const sortValue = item.getAttribute("data-value");

    let sortedProducts = [...allProducts];

    if (sortValue === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    cards.innerHTML = "";

    sortedProducts.forEach((element) => {
      cards.innerHTML += `
        <div class="card">
            <div class="card__top">
            <img src="${element.image || "img/placeholder.png"}" alt="img" onerror="this.onerror=null; this.src='img/placeholder.png'">

            <div class="card__info">
                <div class="card__df">
                    <h4>${element.title}</h4>
                    <h3>$${element.price}</h3>
                </div>
                <p>${element.category}</p>
            </div>
            </div>
            <button class="btns_basket_add" data-id="${element.id}">Into a basket</button>
        </div>
      `;
    });

    addToBasket();
  });
});

menu[0].classList.add("active");

showProducts();
