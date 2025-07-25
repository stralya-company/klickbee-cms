import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { instructions, prompt, model } = body;

	try {
		let resultText = "";
		// TODO: refactor when ai settings and types created
		if (model === "chatgpt") {
			const res = await fetch(
				"https://api.openai.com/v1/chat/completions",
				{
					body: JSON.stringify({
						messages: [
							{ content: instructions, role: "developer" },
							{ content: prompt, role: "user" },
						],
						model,
					}),
					headers: {
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
						"Content-Type": "application/json",
					},
					method: "POST",
				},
			);

			const data = await res.json();
			resultText = data.choices[0].message.content;
		} else if (model === "mistral") {
			const res = await fetch(
				"https://api.mistral.ai/v1/chat/completions",
				{
					body: JSON.stringify({
						messages: [
							{ content: instructions, role: "system" },
							{ content: prompt, role: "user" },
						],
						model,
					}),
					headers: {
						Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
						"Content-Type": "application/json",
					},
					method: "POST",
				},
			);

			const data = await res.json();
			resultText = data.choices[0].message.content;
		} else if (model === "deepseek") {
			const res = await fetch(
				"https://api.deepseek.com/chat/completions",
				{
					body: JSON.stringify({
						messages: [
							{ content: instructions, role: "system" },
							{ content: prompt, role: "user" },
						],
						model,
					}),
					headers: {
						Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
						"Content-Type": "application/json",
					},
					method: "POST",
				},
			);

			const data = await res.json();
			resultText = data.choices[0].message.content;
		} else {
			return NextResponse.json(
				{ error: "Unsupported model" },
				{ status: 400 },
			);
		}

		return NextResponse.json({ result: resultText }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Server error while generating text" },
			{ status: 500 },
		);
	}
}
