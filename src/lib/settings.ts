import { prisma } from "@/lib/prisma";

export const getSetting = async (key: string, userId?: string | null) => {
	if (userId) {
		const userSetting = await prisma.userSettings.findUnique({
			where: { key_userId: { key, userId } },
		});
		if (userSetting) return userSetting.value;
	}
	const setting = await prisma.settings.findUnique({ where: { key } });
	return setting?.value ?? null;
};

export const setUserSetting = async (
	key: string,
	value: string,
	userId: string,
) => {
	return prisma.userSettings.upsert({
		where: { key_userId: { key, userId } },
		update: { value },
		create: { key, value, userId },
	});
};

export const setSetting = async (key: string, value: string) => {
	return prisma.settings.upsert({
		where: { key },
		update: { value },
		create: { key, value },
	});
};
