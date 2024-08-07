import type { Request, Response } from "express";
import { enkripPass, verifikasiPass } from "../helpers/hash";
import { EnkodeTok } from "../helpers/jwt";
import { z } from "zod";
import type AuthenticatedRequest from "../extendedReq";
import userModels from "../models/userModel";

const validasiUserRegister = z.object({
	user: z.string().min(1, { message: "User harus diisi" }),
	email: z.string().email({ message: "Email harus diisi" }),
	password: z.string().min(1, { message: "Password harus diisi" }),
});

//Register user
//Public
export const userRegis = async (req: Request, res: Response) => {
	try {
		const { user, password, email } = req.body;
		//Validasi input dengan Zod
		validasiUserRegister.parse({ user, password, email });

		if (!user || !password || !email) {
			return res.status(400).json({ message: "Semua data harus diisi" });
		}

		//Cek user dan email sudah terdaftar atau belum
		const userTerdaftar = await userModels.findOne({ user });
		const EmailTerdaftar = await userModels.findOne({ email });

		if (userTerdaftar) {
			return res.status(401).json({ message: "User sudah terdaftar" });
		}
		if (EmailTerdaftar) {
			return res.status(401).json({ message: "Email sudah terdaftar" });
		}

		//Enkripsi password
		const PasswordHash = enkripPass(password);

		//Jika semua validasi terpenuhi, maka data user akan dibuat dan disimpan di database
		const isiUser = await userModels.create({
			user: user,
			password: PasswordHash,
			email: email,
		});

		if (isiUser) {
			res.status(201).json({
				message: "Pengguna berhasil didaftarkan",
			});
		}
	} catch (error) {
		res.status(400).send(error);
	}
};

//Login User
//Public
const validasiUserLogin = z.object({
	user: z.string().min(1, { message: "User harus diisi" }),
	password: z.string().min(1, { message: "Password harus diisi" }),
});

export const userLogin = async (req: Request, res: Response) => {
	try {
		const { user, password } = req.body;

		//Validasi input dengan Zod
		validasiUserLogin.parse({ user, password });

		//Cek user
		const isiUser = await userModels.findOne({ user: user });
		if (!isiUser) {
			res.status(401).json({ message: "Username atau Password salah" });
			return;
		}

		//Verifikasi password apakah sesuai dengan hash di database
		const verifyPassword = verifikasiPass(password, isiUser.password);
		if (!verifyPassword) {
			res.status(401).json({ message: "Username atau Password salah" });
			return;
		}

		//Jika user dan password benar, maka akan menghasilkan akses token yang terenkripsi
		const AksesToken = EnkodeTok({
			id: isiUser.id,
			user: isiUser.user,
			email: isiUser.email,
		});

		//Mengirimkan akses token ke client sebagai HTTP-only cookie
		if (AksesToken) {
			res.cookie("token", AksesToken, {
				httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 900000,
			});
			res.status(200).json({
				pesan: "Sukses",
			});
		}
	} catch (error) {
		res.status(404).send(error);
	}
};

//Current user
//Private
export const loggedUser = (req: AuthenticatedRequest, res: Response) => {
	res.status(200).json({ current_user: req.user, loggedIn: true });
};

export const userLogout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout berhasil" });
}
