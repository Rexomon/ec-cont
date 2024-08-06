import jsonwebtk from "jsonwebtoken";

const passKeySecret: string = process.env.PASSKEYSECRET as string;

export const EnkodeTok = (payload: object) => {
	return jsonwebtk.sign(payload, passKeySecret, {expiresIn: "15m"});  
};

export const verifyTok = (token: string) => {
	return jsonwebtk.verify(token, passKeySecret);
};

