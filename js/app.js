const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();
// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product bg-white">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p class="card-text">Rating: ${product.rating.rate}/5 ⭐ { Rated by ${product.rating.count} people }</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" type="button"
    	data-bs-toggle="modal"
    	data-bs-target="#exampleModal" onclick="displaySingleProduct(${product.id}, ${product.price})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
  updateTaxAndCharge();
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
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
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};




// modal functionality
const displaySingleProduct = (id, price) => {
  const modalContent = document.getElementById("modal-content");
  console.log(modalContent);
  modalContent.innerHTML = `<div class="d-flex justify-content-center my-5 py-5">
  					<div class="spinner-border" role="status">
  						<span class="visually-hidden">Loading...</span>
  					</div>
  				</div>`;
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then((product) => {
      console.log(product);
      modalContent.innerHTML = `
      <div class="modal-body">
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-6"><img src=${product.image} class="img-fluid" alt=""></div>
							<div class="col-md-6 ms-auto">
								<h3>${product.title}</h3>
								<p>Category: ${product.category}</p>
								<h2>Price: $ ${product.price}</h2>
								<p class="card-text">${product.description}</p>
								<p class="card-text">Rating: ${product.rating.rate}/5 ⭐ { Rated by
									${product.rating.count} people }</p>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="addToCart(${price})" data-bs-dismiss="modal" aria-label="Close">Add To Cart</button>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
      `;
    })
    ;


};
var myModal = document.getElementById('myModal');
var myInput = document.getElementById('myInput');

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus();
});