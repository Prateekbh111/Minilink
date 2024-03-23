import { nanoid } from "nanoid";
import { URL } from "../model/url.model.js";

async function handleGenerateShortUrl(req, res) {
	const body = req.body;
	if (!body.url) return res.status(400).json({ error: "URL is required" });
	const shortId = nanoid(8);

	await URL.create({
		shortId: shortId,
		redirectedURL: body.url,
		visitedHistory: [],
		createdBy: req.user._id,
	});

	return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
	const shortId = req.params.shortId;
	const result = await URL.findOne({ shortId });
	return res.json({
		totalVisits: result.visitHistory.length,
		analytics: result.visitHistory,
	});
}

async function handleRedirect(req, res) {
	const shortId = req.params.shortId;
	const entry = await URL.findOneAndUpdate(
		{ shortId },
		{ $push: { visitHistory: { timeStamp: Date.now() } } }
	);
	res.redirect(entry.redirectedURL);
}

export { handleGenerateShortUrl, handleGetAnalytics, handleRedirect };
