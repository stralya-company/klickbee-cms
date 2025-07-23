/** biome-ignore-all lint/style/noCommonJs: build error when esmodule */
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const envPath = path.resolve(__dirname, "../.env");
const keyName = "ADMIN_GENERATED_KEY";

let env = "";
if (fs.existsSync(envPath)) {
	env = fs.readFileSync(envPath, "utf-8");
}

if (!env.includes(keyName)) {
	const newKey = randomUUID();
	env += `\n${keyName}=admin_${newKey}\n`;
	fs.writeFileSync(envPath, env);
	// biome-ignore lint/suspicious/noConsole: usefull feedback for users
	console.log(
		`A new admin key has been generated and added to the .env file: admin_${newKey}`,
	);
} else {
	// biome-ignore lint/suspicious/noConsole: usefull feedback for users
	console.log(
		`The admin key already exists in the .env file. No changes were made.`,
	);
}
