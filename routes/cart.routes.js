import { addToCart, updateCart , deleteFromCart, getCart} from "../controllers/cart.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

function cartRoutes(app){

    app.post("/api/cart", authenticateUser,addToCart);
app.put("/api/cart/:id",authenticateUser, updateCart);
app.delete("/api/cart/:id",authenticateUser, deleteFromCart);
app.get("/api/cart",authenticateUser, getCart);

}


export default cartRoutes;


