import { getUser } from "../utils/auth.js";

async function verifyUser(req, res, next) {
	const userToken = req.cookies?.accessToken;

	if (!userToken) return res.status(401).send({ message: "No user id found" });
	const user = getUser(userToken);

	if (!user) return res.status(401).send({ message: "No user found" });

	req.user = user;
	next();
}

export { verifyUser };
