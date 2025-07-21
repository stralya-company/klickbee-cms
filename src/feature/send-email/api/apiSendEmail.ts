import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
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
		const emailUsername = await getSetting("emailUsername");
		const emailPassword = await getSetting("emailPassword");
		const emailSender = await getSetting("emailSender");

		const transporter = nodemailer.createTransport({
			host: emailHost || "",
			port: Number(emailPort || ""),
			secure: true,
			auth: {
				user: emailUsername || "",
				pass: emailPassword || "",
			},
		});

		await transporter.sendMail({
			from: emailSender || "",
			to,
			subject,
			text,
		});

		return NextResponse.json({ message: "Email sent with success" });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Server error while sending email" }, { status: 500 });
	}
}
