import express from "express";
import {
	getAllItems,
	createItems,
	updateItems,
	deleteItems,
	getUserItems,
} from "../Controller/itemControl";

import { itemCart, cartData, deleteCartItem, updateQuantity } from "../Controller/cartControl";
import ValidateToken from "../middleware/validateToken";

const itemRouter = express.Router();

itemRouter.get("/all-items", getAllItems);

itemRouter.use(ValidateToken);

itemRouter.get("/user-items/", getUserItems);
itemRouter.get("/cart-data", cartData);

itemRouter.post("/cart-items/:id", itemCart);
itemRouter.post("/create-items", createItems);

itemRouter.put("/update-items/:id", updateItems);
itemRouter.put("/update-quantity/:id", updateQuantity)

itemRouter.delete("/delete-items/:id", deleteItems);
itemRouter.delete("/delete-cart-item/:id", deleteCartItem);
export default itemRouter;
