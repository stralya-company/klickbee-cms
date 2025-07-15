import { writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("logo") as File | null;

	if (!file) {
		return NextResponse.json(
			{ error: "Aucun fichier envoyé" },
			{ status: 400 },
		);
	}

	if (!["image/png", "image/jpeg"].includes(file.type)) {
		return NextResponse.json(
			{ error: "Type de fichier non supporté" },
			{ status: 415 },
		);
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const fileName = `logo_${Date.now()}.${file.type.split("/")[1]}`;
	const filePath = join(
		process.cwd(),
		"public",
		"builder",
		"uploads",
		"logo",
		fileName,
	);

	await writeFile(filePath, buffer);

	const url = `/builder/uploads/logo/${fileName}`;
	return NextResponse.json(
		{ url },
		{
			status: 200,
			headers: { "Content-Type": "application/json" },
		},
	);
}
