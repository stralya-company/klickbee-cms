import prisma from "../src/lib/prisma";
import bcrypt from "bcrypt";

const rolePermissions: Record<string, string[]> = {
    admin: ['read', 'write', 'delete', 'manage_users'],
    user: ['read', 'write'],
};

async function main() {
    // Create roles and permissions
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

    // Create admin user
    const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
    if (adminRole) {
        const existingUser = await prisma.user.findUnique({
            where: { email: 'admin@klickbee.com' }
        });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash('admin123', 10);

            // Create user and associated account (better-auth compatible)
            const user = await prisma.user.create({
                data: {
                    email: 'admin@klickbee.com',
                    name: 'Admin User',
                    roleId: adminRole.id,
                    emailVerified: true,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                },
            });

            // Create associated account with password
            await prisma.account.create({
                data: {
                    id: `${user.id}-credential`,
                    accountId: user.id,
                    providerId: 'credential',
                    userId: user.id,
                    password: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            console.log('✅ Utilisateur admin créé (admin@klickbee.com / admin123)');
        } else {
            console.log('ℹ️ Utilisateur admin existe déjà');
        }
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
