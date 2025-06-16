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
	console.log(`Clé admin générée et ajoutée à .env : ${newKey}`);
} else {
	console.log("Clé admin déjà présente dans .env");
}
