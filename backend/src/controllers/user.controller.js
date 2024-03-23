import { User } from "../model/user.model.js";
import { URL } from "../model/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			"Something went wrong while generating refresh and access token"
		);
	}
};

async function handleUserSignup(req, res) {
	const { fullname, email, password } = req.body;

	if ([fullname, email, password].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "All fields is required");
	}

	const existedUser = await User.findOne({ email });
	if (existedUser) {
		throw new ApiError(400, "User with this email already exists.");
	}

	const user = await User.create({ fullname, email, password });

	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	if (!createdUser) {
		throw new ApiError(500, "Server error while registering user");
	}

	return res
		.status(201)
		.json(new ApiResponse(200, createdUser, "User registred successfully"));
}

async function handleUserLogin(req, res) {
	const { email, password } = req.body;

	if (!email) {
		throw new ApiError(400, "Email field is required");
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new ApiError(404, "User does not exist");
	}

	const isPasswordValid = await user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "Invalid Credentials");
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
		user._id
	);

	const loggedUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(200, loggedUser, "User logged in successfully"));
}

async function handleGetUserUrls(req, res) {
	const allUrls = await URL.find({ createdBy: req.user._id });
	return res.status(202).json(allUrls);
}

export { handleUserSignup, handleUserLogin, handleGetUserUrls };
