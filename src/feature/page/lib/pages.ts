"use server";

import { JsonValue } from "@prisma/client/runtime/library";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { prisma } from "@/lib/prisma";

export const getAllPages = async () => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.findMany({
		orderBy: {
			createdAt: "desc",
		},
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			type: true,
			updatedAt: true,
		},
	});
};

export const getPageById = async (id: string) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.findUnique({
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			type: true,
			updatedAt: true,
		},
		where: { id },
	});
};

export const createPage = async (data: {
	title: string;
	slug: string;
	type?: string;
	content?: JsonValue;
	parentId?: string | null;
}) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.create({
		data: {
			content: data.content || {},
			isPublished: false,
			parentId: data.parentId || null,
			slug: data.slug,
			title: data.title,
			type: data.type || "default",
		},
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			type: true,
			updatedAt: true,
		},
	});
};
