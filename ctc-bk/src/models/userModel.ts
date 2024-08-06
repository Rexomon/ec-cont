
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: [true, "User harus diisi"],
		},
		email: {
			type: String,
			required: [true, "Email harus diisi"],
			unique: [true, "Email sudah terdaftar"],
			validate: {
				validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
				message: "Masukkan email yang benar",
			},
		},
		password: {
			type: String,
			required: [true, "Password harus diisi"],
		},
	},

	{
		timestamps: true,
	},
);




//Memasukkan data ke dalam model "Users"
const userModels = mongoose.model("Users", userSchema);

export default  userModels;

