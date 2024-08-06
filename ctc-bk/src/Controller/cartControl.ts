import type { Response } from "express";
import type AuthenticatedRequest from "../extendedReq";
import itemModels from "../models/itemModel";
import cartModel from "../models/cartModel";

export const itemCart = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { id } = req.params;
		const item = await itemModels.findById(id);

		if (!item) {
			return res.status(404).send({ message: "Item not found" });
		}

		if (req.user) {
			const userId = req.user.id;
			const cart = await cartModel.findOne({ user_id: userId });

			if (!cart) {
				const newCart = await cartModel.create({
					user_id: userId,
					items: [
						{
							item_id: item._id,
							name: item.name,
							price: Number(item.price),
							description: item.description,
							quantity: 1,
						},
					],
				});
				return res.status(201).send(newCart);
			}

			if (cart) {
				const cartItemIndex = cart.items.findIndex(
					(cartItem) => cartItem.item_id.toString() === item._id.toString(),
				);
				if (cartItemIndex >= 0) {
					cart.items[cartItemIndex].quantity += 1;
					cart.items[cartItemIndex].price += Number(item.price);
				} else {
					cart.items.push({
						item_id: item._id,
						price: Number(item.price),
						name: item.name,
						description: item.description,
						quantity: 1,
					});
				}
				await cart.save();
				return res.status(201).send(cart);
			}
		} else {
			res.status(401).send({ message: "User not authenticated" });
		}
	} catch (error) {
		res.status(403).send({ message: error });
	}
};

export const cartData = async (req: AuthenticatedRequest, res: Response) => {
	try {
		if (req.user) {
			const userId = req.user.id;
			const cart = await cartModel.findOne({ user_id: userId });
			res.status(201).send({ cart });
		}
	} catch (error) {
		res.status(403).send({ message: error });
	}
};

export const deleteCartItem = async (
	req: AuthenticatedRequest,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const cart = await cartModel.findOne({ "items._id": id });

		if (!cart) {
			return res.status(404).send({ message: "Cart not found" });
		}

		if (req.user) {
			await cartModel.updateOne(
				{ _id: cart._id },
				{ $pull: { items: { _id: id } } },
			);
			return res.status(200).send({ message: "Item deleted" });
		}
		return res.status(403).send({ message: "Unauthorized" });
	} catch (error) {
		return res.status(500).send({ message: error });
	}
};

export const updateQuantity = async (
	req: AuthenticatedRequest,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const { action } = req.body;
		const cart = await cartModel.findOne({ "items._id": id });

		if (req.user) {
			if (!cart) {
				return res.status(404);
			}

			const item = cart.items.id(id);
			if (!item) {
				return res.status(404);
			}

			const dataItem = await itemModels.findById(item.item_id);

			if (!dataItem) {
				return res.status(404);
			}

			let newQuantity = item.quantity;
			let newPrice = item.price;
			if (action === "increase") {
				//Menambahkan jumlah item di cart
				newQuantity += 1;
				newPrice += dataItem.price;
			} else if (action === "decrease") {
				//Mengurangi jumlah item di cart
				newQuantity -= 1;
				newPrice -= dataItem.price;
				if (newQuantity < 1) {
					//Mencegah jumlah item kurang dari satu
					newQuantity = 1;
					newPrice = dataItem.price;
				}
			} else {
				return res.status(400).send({ message: "Invalid action" });
			}

			await cartModel.updateOne(
				{ "items._id": id },
				{
					$set: { "items.$.quantity": newQuantity, "items.$.price": newPrice },
				},
			);
			return res.status(200).send({ message: "Quantity updated" });
		}
	} catch (error) {
		return res.status(500).send({ message: error });
	}
};
