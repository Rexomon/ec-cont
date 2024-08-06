import enkripData from "bcrypt";

export const enkripPass = (password: string) => {
	const salt = enkripData.genSaltSync();

	return enkripData.hashSync(password, salt);
};

export const verifikasiPass = (password: string, hash: string) => {
	return enkripData.compareSync(password, hash);
};
