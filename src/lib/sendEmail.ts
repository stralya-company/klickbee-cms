import nodemailer from "nodemailer";
import { getSetting } from "@/lib/settings";
import { decryptString } from "@/lib/crypto";

export interface EmailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
	const { to, subject, text, html } = options;

	const emailHost = await getSetting("emailHost");
	const emailPort = await getSetting("emailPort");
	const emailSecure = await getSetting("emailSecure");
	const emailUsername = await getSetting("emailUsername");
	const emailPassword = await getSetting("emailPassword");
	const emailSender = await getSetting("emailSender");

	const transporter = nodemailer.createTransporter({
		host: emailHost || "",
		port: Number(emailPort || ""),
		secure:
			emailSecure !== undefined
				? emailSecure === "true"
				: Number(emailPort) === 465,
		auth: {
			user: emailUsername || "",
			pass: await decryptString(emailPassword || ""),
		},
	});

	await transporter.sendMail({
		from: emailSender || "",
		to,
		subject,
		text,
		html,
	});
}