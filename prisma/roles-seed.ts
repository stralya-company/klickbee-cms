import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const rolePermissions: Record<string, string[]> = {
	admin: ['read', 'write', 'delete', 'manage_users'],
	user: ['read', 'write'],
}

async function main() {
	for (const [roleName, actions] of Object.entries(rolePermissions)) {
		const role = await prisma.role.upsert({
			create: { name: roleName },
			update: {},
			where: { name: roleName },
		})

		for (const action of actions) {
			await prisma.permission.upsert({
				create: { action, roleId: role.id },
				update: {},
				where: { roleId_action: { action, roleId: role.id } },
			})
		}
	}
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
