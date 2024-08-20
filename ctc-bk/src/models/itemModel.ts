import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
	{
		seller_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		buyer_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
		name: { type: String, required: true },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		countInStock: { type: Number, required: true },
		description: { type: String, required: true },
		image: { url: { type: String, required: true } },
	},
	{
		timestamps: true,
	},
);

//Memasukkan data ke dalam model "Items"
const itemModels = mongoose.model("Items", itemSchema);
export default itemModels;
