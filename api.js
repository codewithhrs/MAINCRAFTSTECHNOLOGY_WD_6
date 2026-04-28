const BASE_URL = "https://fakestoreapi.com/products";

// GET
async function getProducts(){
try{
const res = await fetch(BASE_URL);
if(!res.ok) throw new Error("Fetch failed");
return await res.json();
}catch(err){
throw err;
}
}

// POST
async function createProduct(product){
try{
const res = await fetch(BASE_URL,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(product)
});
if(!res.ok) throw new Error("Post failed");
return await res.json();
}catch(err){
throw err;
}
}

// DELETE
async function removeProduct(id){
try{
const res = await fetch(`${BASE_URL}/${id}`,{
method:"DELETE"
});
if(!res.ok) throw new Error("Delete failed");
return true;
}catch(err){
throw err;
}
}
