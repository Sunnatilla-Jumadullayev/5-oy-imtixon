function getElement(selector, parent = document) {
  return parent.querySelector(selector);
}
const elWrapper = getElement(".product__cards");
const seeMore = getElement(".seeMore");
const elCategory = getElement(".category__list");
const loader = getElement(".loader");
const BASE_URL = `https://fakestoreapi.com`;
console.log(elWrapper);

// limit
let limitCount = 8;
let offset = 1;
// get data
async function getData(endpoint, count) {
  const response = await fetch(
    `${BASE_URL}/${endpoint}?limit=${limitCount * count}`
  );
  response
    .json()
    .then((res) => createElement(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loader.style.display = "none";
    });
}
getData("products", offset);

// creaate element
function createElement(data) {
  while (elWrapper.firstChild) {
    elWrapper.firstChild.remove();
  }

  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product__card");
    productCard.dataset.id = product.id;
    productCard.innerHTML = `
    <div class="product__img">
      <img class="product__img" src="${product.image}" alt="${
      product.description
    }" />
      <button class="product__btn">Add to</button>
    </div>
    <div class="product__name">
      <h3 class="product__title">${product.title}</h3>
      <img src="./images/heart_small.png" alt="favorite" />
    </div>
    <div class="product__text">
      <p class="product__price">${product.price}</p>
      <div class="product__rating">
        ${`<img src="./images/ichitolaYurak.png" alt="rating" />`.repeat(
          Math.floor(product.rating.rate)
        )}
        ${`<img src="./images/ichitolaYurak1.png" alt="rating" />`.repeat(
          5 - Math.floor(product.rating.rate)
        )}
      </div>
      <p class="product__comment-number">(${product.rating.count})</p>
    </div>`;

    elWrapper.appendChild(productCard);
    console.log(productCard);
  });
}

// kategoriya
async function getCategory(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  response.json().then((res) => createCategory(res));
}
getCategory(`products/categories`);

function createCategory(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    const categoryData = document.createElement("data");
    div.classList.add("category__item");
    categoryData.innerHTML = item;
    categoryData.setAttribute("value", `/category/${item}`);
    categoryData.addEventListener("click", (e) => {
      const val = e.target.value;
      getData(`products${val}`, offset);
    });
    div.appendChild(categoryData);
    elCategory.appendChild(div);
  });
}

// see more
seeMore.addEventListener("click", () => {
  offset++;
  getData("products", offset);
});
// detail page
elWrapper.addEventListener("click", (event) => {
  if (event.target.className === "product__img") {
    let id = event.target.closest(".product__card").dataset.id;
    open(`/pages/product.html?q=${id}`, "_self");
    console.log(`detail`);
    console.log(event.target);
  } else {
    console.log(`123 `);
  }
  console.log(`salom`);
});
