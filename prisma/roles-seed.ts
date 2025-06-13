import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rolePermissions: Record<string, string[]> = {
    admin: ['read', 'write', 'delete', 'manage_users'],
    user: ['read', 'write'],
};

async function main() {
    for (const [roleName, actions] of Object.entries(rolePermissions)) {
        const role = await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: { name: roleName },
        });

        for (const action of actions) {
            await prisma.permission.upsert({
                where: { roleId_action: { roleId: role.id, action } },
                update: {},
                create: { action, roleId: role.id },
            });
        }
    }
    console.log('✅ Rôles et permissions initialisés');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });