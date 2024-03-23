import JWT from "jsonwebtoken";
const secret = "Prateek12#@";

function setUser(user) {
	return JWT.sign(
		{
			_id: user.id,
			email: user.email,
		},
		process.env.JWT_ACCESS_SECRET
	);
}

function getUser(token) {
	if (!token) return null;
	return JWT.verify(token, process.env.JWT_ACCESS_SECRET);
}

export { setUser, getUser };
