"use server";

import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { prisma } from "@/lib/prisma";

export const getAllContacts = async () => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.contact.findMany({
		orderBy: {
			createdAt: "desc",
		},
		select: {
			content: true,
			createdAt: true,
			email: true,
			id: true,
			name: true,
			number: true,
			submitDate: true,
		},
	});
};

export const getContactById = async (id: string) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.contact.findUnique({
		select: {
			content: true,
			createdAt: true,
			email: true,
			id: true,
			name: true,
			number: true,
			submitDate: true,
		},
		where: { id },
	});
};

export const deleteContact = async (id: string) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.contact.delete({
		where: { id },
	});
};

export const deleteContacts = async (ids: string[]) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.contact.deleteMany({
		where: {
			id: {
				in: ids,
			},
		},
	});
};
