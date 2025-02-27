
import { registerUser, loginUser } from "../controllers/auth.controller.js";

function authRoutes(app){

app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
}
export default authRoutes;

