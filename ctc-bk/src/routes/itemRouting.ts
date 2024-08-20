import express from "express";
import multer from "multer";
import mime from "mime-types";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import type { Request, Response } from "express";
import type { Readable } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage";
import ValidateToken from "../middleware/validateToken";
import type AuthenticatedRequest from "../extendedReq";

import {
	getAllItems,
	updateItems,
	deleteItems,
	getUserItems,
} from "../Controller/itemControl";
import {
	itemCart,
	cartData,
	deleteCartItem,
	updateQuantity,
} from "../Controller/cartControl";

import itemModels from "../models/itemModel";

const upload = multer({ storage: multer.memoryStorage() });

const s3Client = new S3Client({
	region: "auto",
	endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID as string}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
	},
});

const itemRouter = express.Router();

itemRouter.get("/all-items", getAllItems);

itemRouter.use(ValidateToken);

itemRouter.get("/user-items/", getUserItems);
itemRouter.get("/cart-data", cartData);

itemRouter.post("/cart-items/:id", itemCart);
itemRouter.post(
	"/create-items",
	upload.single("image"),
	async (req: AuthenticatedRequest, res: Response) => {
		const { name, price, category, countInStock, description } = req.body;

		if (!name || !price || !category || !countInStock || !description) {
			res.status(400).json({ message: "All fields are required" });
		}

		const file = req.file;
		const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;

		if (!file) {
			return res.status(400).send("No file uploaded");
		}

		try {
			const contentType = mime.lookup(file.originalname);

			const upload = new Upload({
				client: s3Client,
				params: {
					Bucket: bucketName,
					Key: file.originalname,
					Body: file.buffer,
					ContentType: contentType as string,
				},
			});

			await upload.done();
			const fileName = `${file.originalname}`;
            const encodedFileName = encodeURIComponent(fileName);
            const fileUrl = `https://r2.riylunz.website/${encodedFileName}`

			if (fileUrl) {
				const item = await itemModels.create({
					name,
					price,
					category,
					countInStock,
					description,
					seller_id: req.user.id,
					image: { url: fileUrl },
				});
				res.status(201).json({ item });
			}
		} catch (error) {
			console.error(error);
			res.status(500).send("Error uploading file");
		}
	},
);

itemRouter.put("/update-items/:id", updateItems);
itemRouter.put("/update-quantity/:id", updateQuantity);

itemRouter.delete("/delete-items/:id", deleteItems);
itemRouter.delete("/delete-cart-item/:id", deleteCartItem);

export default itemRouter;
