const productContainer = document.getElementById("products");
const loader = document.getElementById("loader");
const errorBox = document.getElementById("error");

// LOAD PRODUCTS
async function loadProducts(){
loader.classList.remove("hidden");
errorBox.classList.add("hidden");

try{
const products = await getProducts();
displayProducts(products);
}catch(err){
errorBox.innerText = "❌ Error loading products!";
errorBox.classList.remove("hidden");
}finally{
loader.classList.add("hidden");
}
}

// DISPLAY PRODUCTS
function displayProducts(products){
productContainer.innerHTML="";

products.forEach(p=>{
const card = document.createElement("div");
card.className="card";

card.innerHTML = `
<img src="${p.image}">
<h3>${p.title}</h3>
<p>₹${p.price}</p>
<button onclick="deleteItem(${p.id})">Delete</button>
<button onclick="addToCart(${p.id}, '${p.title}', ${p.price})">Add to Cart</button>
`;

productContainer.appendChild(card);
});
}

// DELETE
async function deleteItem(id){
try{
await removeProduct(id);
loadProducts();
}catch{
alert("Delete failed!");
}
}

// ADD PRODUCT
document.getElementById("addBtn").addEventListener("click", async ()=>{
const title = document.getElementById("title").value;
const price = document.getElementById("price").value;
const image = document.getElementById("image").value;

if(!title || !price){
alert("Please fill all fields");
return;
}

try{
await createProduct({title, price, image});
loadProducts();
}catch{
alert("Failed to add product");
}
});

// CART (LocalStorage)
function addToCart(id,title,price){
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existing = cart.find(item=>item.id === id);

if(existing){
existing.qty++;
}else{
cart.push({id,title,price,qty:1});
}

localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart!");
}

// INIT
loadProducts();
