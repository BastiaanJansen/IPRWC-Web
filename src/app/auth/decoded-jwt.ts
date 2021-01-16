import { User } from "../user/user.model";

export interface DecodedJWT {
	iat: number;
	exp: number;
	user: User;
}
