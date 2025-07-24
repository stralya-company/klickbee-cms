import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma/prisma";

const rolePermissions: Record<string, string[]> = {
	admin: ["read", "write", "delete", "manage_users"],
	user: ["read", "write"],
};

async function main() {
	// Create roles and permissions
	for (const [roleName, actions] of Object.entries(rolePermissions)) {
		const role = await prisma.role.upsert({
			create: { name: roleName },
			update: {},
			where: { name: roleName },
		});

		for (const action of actions) {
			await prisma.permission.upsert({
				create: { action, roleId: role.id },
				update: {},
				where: { roleId_action: { action, roleId: role.id } },
			});
		}
	}
	console.warn("✅ Rôles et permissions initialisés");

	// Create admin user (only in development)
	if (process.env.NODE_ENV === "development") {
		const adminRole = await prisma.role.findUnique({
			where: { name: "admin" },
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
						roleId: adminRole.id,
						updatedAt: new Date(),
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
						updatedAt: new Date(),
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
