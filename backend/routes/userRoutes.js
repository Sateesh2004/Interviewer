import { Router } from "express";
import {register} from "../controllers/userController.js";
import {signin} from "../controllers/userController.js"
const routes = Router()
routes.post("/signup",register)
routes.post("/signin",signin)
export default routes