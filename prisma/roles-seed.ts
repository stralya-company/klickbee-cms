import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma";

async function main() {
	// Create admin user (only in development)
	if (process.env.NODE_ENV === "development") {
		const adminRole = await prisma.user.findFirst({
			where: { role: "admin" },
		});
		if (adminRole) {
			const existingUser = await prisma.user.findUnique({
				where: { email: "admin@klickbee.com" },
			});

			if (!existingUser) {
				const hashedPassword = await bcrypt.hash("admin123", 10);

				// Create user and associated account (better-auth compatible)
				const user = await prisma.user.create({
					data: {
						createdAt: new Date(),
						email: "admin@klickbee.com",
						emailVerified: true,
						name: "Admin User",
						role: "admin",
					},
				});

				// Create associated account with password
				await prisma.account.create({
					data: {
						accountId: user.id,
						createdAt: new Date(),
						id: `${user.id}-credential`,
						password: hashedPassword,
						providerId: "credential",
						userId: user.id,
					},
				});

				console.warn(
					"✅ Utilisateur admin créé (admin@klickbee.com / admin123)",
				);
			} else {
				console.warn("ℹ️ Utilisateur admin existe déjà");
			}
		}
	} else {
		console.warn("ℹ️ Création d'admin ignorée (pas en développement)");
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
