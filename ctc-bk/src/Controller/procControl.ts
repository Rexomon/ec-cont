import type AuthenticatedRequest from "../extendedReq";
import type { Response } from "express";
import contact from "../models/contModel";

export const getCont = async (req: AuthenticatedRequest, res: Response) => {
	if (req.user) {
		const isiContact = await contact.find({ user_id: req.user.id });

		res.status(200).json({ isiContact });
	}
};

export const getSingCont = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { id } = req.params;

		if (req.user) {
			const isiContact = await contact.findById(id);
			res.status(200).json({
				isiContact,
			});
		}
	} catch (error) {
		res.status(403).send(error);
	}
};

export const CreateCont = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { name, email, phone } = req.body;

		if (!name || !email || !phone) {
			res.status(400).send("Credentials missing");
		}

		if (req.user) {
			const isiContact = await contact.create({
				name: name,
				email: email,
				phone: phone,
				user_id: req.user.id,
			});

			res.status(201).json({
				isiContact,
			});
		}
	} catch (error) {
		res.status(403).send(error);
	}
};

export const UpdateCont = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { id } = req.params;

		const isiContact = await contact.findById(id);

		if (req.user) {
			const updateContact = await contact.findByIdAndUpdate(
				isiContact,
				req.body,
				{ new: true },
			);

			res.status(200).json({
				updateContact,
			});
		}
	} catch (error) {
		res.status(403).send(error);
	}
};

export const deleteCont = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { id } = req.params;

		const isiContact = await contact.findById(id);
		if (req.user) {
			await contact.findByIdAndDelete(isiContact, req.body);
			res.status(200).json({
				message: "Contact deleted",
			});
		}
	} catch (error) {
		res.status(403).send(error);
	}
};
