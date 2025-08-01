"use server";

import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { PageLight } from "@/feature/page/types/page";
import { prisma } from "@/lib/prisma";

/**
 * Duplicates a page with a new title and slug
 */
export const duplicatePage = async (pageId: number) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	// Get the original page
	const originalPage = await prisma.page.findUnique({
		where: { id: pageId },
	});

	if (!originalPage) {
		throw new Error("Page not found");
	}

	// Create a duplicate with a new title and slug
	const timestamp = Date.now();
	return prisma.page.create({
		data: {
			content: originalPage.content ?? {},
			isPublished: false, // Set as unpublished by default
			metaDescription: originalPage.metaDescription,
			metaKeywords: originalPage.metaKeywords,
			metaTitle: originalPage.metaTitle,
			parentId: originalPage.parentId,
			slug: `${originalPage.slug}-copy-${timestamp}`,
			title: `${originalPage.title} (Copy)`,
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
			slug: true,
			title: true,
			updatedAt: true,
		},
	});
};

/**
 * Deletes a page
 */
export const deletePage = async (pageId: number) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	// Check if this is the home page
	const homepageSetting = await prisma.settings.findUnique({
		where: { key: "current_homepage_id" },
	});

	if (homepageSetting && Number(homepageSetting.value) === pageId) {
		throw new Error(
			"Cannot delete the home page. Set another page as home first.",
		);
	}

	// Delete the page
	await prisma.page.delete({
		where: { id: pageId },
	});

	return { success: true };
};

/**
 * Sets a page as the home page
 */
export const setAsHomePage = async (pageId: number) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	// Update the setting
	await prisma.settings.upsert({
		create: { key: "current_homepage_id", value: String(pageId) },
		update: { value: String(pageId) },
		where: { key: "current_homepage_id" },
	});

	return { success: true };
};
