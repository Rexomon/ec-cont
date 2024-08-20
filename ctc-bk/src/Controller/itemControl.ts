import type { Request, Response } from "express";
import type AuthenticatedRequest from "../extendedReq";
import itemModels from "../models/itemModel";


export const getAllItems = async (req: Request, res: Response) => {
	try {
		const items = await itemModels.find();
		res.status(201).json({ items });
	} catch (error) {
		res.status(401).json({ message: error });
	}
};

export const getUserItems = async (
	req: AuthenticatedRequest,
	res: Response,
) => {
	try {
		if (req.user) {
			const items = await itemModels.find({ seller_id: req.user.id });
			res.status(201).json({ items });
		}
	} catch (error) {
		res.status(401).json({ message: error });
	}
};

export const updateItems = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { id } = req.params;
		const item = await itemModels.findById(id);

		if (req.user) {
			const updatedItem = await itemModels.findByIdAndUpdate(item, req.body, {
				new: true,
			});
			res.status(200).json(updatedItem);
		}
	} catch (error) {
		res.status(403).send(error);
	}
};

export const deleteItems = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { id } = req.params;
		const item = await itemModels.findById(id);

		if (req.user) {
			await itemModels.findByIdAndDelete(item, req.body);
			res.status(200).json({ message: "Item deleted" });
		}
	} catch (error) {
		res.status(403).send(error);
	}
};
