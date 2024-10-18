function getElement(selector, parent = document) {
  return parent.querySelector(selector);
}

const BASE_URL = `https://fakestoreapi.com`;
const elProduct = document.querySelector(".detail");

async function getData() {
  let query = new URLSearchParams(window.location.search);
  let id = query.get(`q`);

  let response = await fetch(`${BASE_URL}/products/${id}`);
  response.json().then((res) => getProduct(res));
}
getData();

function getProduct(data) {
  console.log(data);
  elProduct.innerHTML = `
    <div class="detail__img">
      <img src="${data.image}" alt="${data.description}" />
    </div>
    <div class="detail__main">
      <h2 class="detail__name">
      ${data.title}</h2>
      <div class="detail__rating">
        <div class="detail__rating-comment">
        ${`<img src="../images/ichitolaYurak.png" alt="rating" />`.repeat(
          Math.floor(data.rating.rate)
        )}
          ${`<img src="../images/ichitolaYurak1.png" alt="rating" />`.repeat(
            5 - Math.floor(data.rating.rate)
          )}x
         
        
          <p class="detail__rating-number">(
            ${data.rating.count} comment)</p>
        </div>

        <p class="detail__rating-text">In Stock</p>
      </div>
      <h1 class="detail__price">${data.price} $$</h1>
      <div class="description">
       ${data.description}
      </div>
      <hr />
      <div class="detail__color">
        <p>Colours:</p>
        <div class="colour"></div>
        <div style="background-color: #3c7bc9" class="colour"></div>
      </div>
      <div class="detail__size">
        <p>Size</p>
        <div>XS</div>
        <div>S</div>
        <div>M</div>
        <div>L</div>
        <div>XL</div>
      </div>
      <div class="detail__data">
        <div class="detail__count">
          <div class="minus">-</div>
          <p class="count">0</p>
          <div class="plus">+</div>
        </div>
        <button class="byBtn">Buy now</button>
        <img src="../images/heart_small.png" alt="#" />
      </div>

      <div class="detail___bottom">
        <div class="detail___cargo">
          <img src="../images/cargo.png" alt="#" />

          <div class="detail___cargo-text">
            <h4>Free Delivery</h4>
            <p>Enter your postal code for Delivery Availability</p>
          </div>
        </div>
        <div class="detail___return">
          <img src="../images/Icon-return.png" alt="#" />

          <div class="detail___cargo-text">
            <h4>Return Delivery</h4>
            <p>Enter your postal code for Delivery Availability</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
console.log(elProduct);
