import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { decryptString } from "@/lib/crypto";
import { getSetting } from "@/lib/settings";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { to, subject, text } = body;

	if (!to) {
		return NextResponse.json(
			{ error: "missing to field" },
			{ status: 400 },
		);
	}

	try {
		const emailHost = await getSetting("emailHost");
		const emailPort = await getSetting("emailPort");
		const emailSecure = await getSetting("emailSecure");
		const emailUsername = await getSetting("emailUsername");
		const emailPassword = await getSetting("emailPassword");
		const emailSender = await getSetting("emailSender");

		const transporter = nodemailer.createTransport({
			auth: {
				pass: await decryptString(emailPassword || ""),
				user: emailUsername || "",
			},
			host: emailHost || "",
			port: Number(emailPort || ""),
			secure:
				emailSecure !== undefined
					? emailSecure === "true"
					: Number(emailPort) === 465,
		});

		await transporter.sendMail({
			from: emailSender || "",
			subject,
			text,
			to,
		});

		return NextResponse.json(
			{ message: "Email sent with success" },
			{ status: 200 },
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Server error while sending email" },
			{ status: 500 },
		);
	}
}
