import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		name: {
			type: String,
			required: [true, "Add the contact name"],
		},
		email: {
			type: String,
			required: [true, "Add the contact email address"],
		},
		phone: {
			type: String,
			required: [true, "Add the contact phone number"],
		},
	},

	{
		timestamps: true,
	},
);

//Memasukkan data ke dalam model "Contacts"
export default mongoose.model("Contacts", contactSchema);
