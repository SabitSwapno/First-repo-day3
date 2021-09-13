const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayProducts(data));
};
loadProducts();

// show all product in UI 
const displayProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h5>Rated by ${product.rating.count} people</h5>
      <h4>Rated ${product.rating.rate} Stars</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
      <button id="details-btn" class="btn btn-primary">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// Price add to cart section
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  cartUpdatePrice("price", price);

  cartUpdateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  cartUpdateTotal();
};
// Get the product input value section 
const getProductInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const cartUpdatePrice = (id, value) => {
  const convertedOldPrice = getProductInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.abs(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs(value.toFixed(2));
};

// update to cart the delivery charge and total Tax
const cartUpdateTaxAndCharge = () => {
  const priceConverted = getProductInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const cartUpdateTotal = () => {
  const grandTotal =
    getProductInputValue("price") + getProductInputValue("delivery-charge") +
    getProductInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
