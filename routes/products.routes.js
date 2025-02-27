
import { getProducts, getProductById } from "../controllers/product.controller.js";

function productRoutes(app){

app.get("/api/products", getProducts);       // Fetch all products

// Fetch product by ID
app.get("/api/products/:id", getProductById); 


}



export default productRoutes;