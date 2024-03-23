import express from "express";
import {
	handleGenerateShortUrl,
	handleGetAnalytics,
	handleRedirect,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/:shortId", handleRedirect);
router.get("/analytics/:shortId", handleGetAnalytics);

export { router };
