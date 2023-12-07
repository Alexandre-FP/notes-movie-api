import UserController from "../controllers/UsersController.js";
import express from "express"

const routerUser = express.Router();
const userContoller = new UserController;

routerUser.post("/create-user", userContoller.create);
routerUser.put("/create-user/:id", userContoller.update);
routerUser.get("/search-users", userContoller.index);
routerUser.delete("/delete-user/:id", userContoller.deleteUsers);

export default routerUser; 