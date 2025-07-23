import { randomUUID } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env");
const keyName = "ADMIN_GENERATED_KEY";

let env = "";
if (existsSync(envPath)) {
	env = readFileSync(envPath, "utf-8");
}

if (!env.includes(keyName)) {
	const newKey = randomUUID();
	env += `\n${keyName}=admin_${newKey}\n`;
	writeFileSync(envPath, env);
}
