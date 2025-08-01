"use client";
import { JsonValue } from "@prisma/client/runtime/library";
import { MoreHorizontal, Plus } from "lucide-react";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { useCreatePage } from "@/feature/page/queries/useCreatePage";
import { usePages } from "@/feature/page/queries/usePages";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";

type Page = {
	id: string;
	title: string;
	slug: string;
	type: string;
	content: JsonValue;
	createdAt: Date;
	updatedAt: Date;
	parentId: string | null;
	metaTitle: string | null;
	metaDescription: string | null;
	metaKeywords: string | null;
	isPublished: boolean;
	publishedAt: Date | null;
};

function PagesList() {
	const { data: pages } = usePages();
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const createPage = useCreatePage();
	const setSetting = useSetSetting();
	const { data: currentHomepage } = useSetting("current_homepage_id");

	const handleCurrentPageSwitch = (newCurrentSlug: string) => {
		useCurrentPageStore.setState({
			currentPage: newCurrentSlug,
		});
	};

	const handleAddPage = async () => {
		try {
			const title = "New Page";
			const slug = `page-${Date.now()}`;

			const newPage = await createPage.mutateAsync({
				content: {},
				slug,
				title,
			});

			// If there are no pages or this is the first page, set it as homepage
			if (!pages || (Array.isArray(pages) && pages.length) === 0) {
				await setSetting.mutateAsync({
					key: "current_homepage_id",
					value: newPage.id,
				});
			}

			// Switch to the new page
			handleCurrentPageSwitch(newPage.slug);
		} catch (error) {
			console.error("Failed to create page:", error);
		}
	};

	const renderPage = (page: Page, isChild = false) => {
		return (
			<div
				className={`group flex items-center justify-between px-4 text-sm hover:bg-muted rounded-sm`}
				key={page.id}
			>
				<Button
					className={
						"px-0 m-0 hover:no-underline w-9/10 py-5 text-left flex justify-start "
					}
					onClick={() => handleCurrentPageSwitch(page.slug)}
					variant={"link"}
				>
					<span
						className={`text-left truncate ${isChild ? "pl-6 before:content-['—'] before:mr-1" : ""}
					${currentHomepage?.value == page.id ? "after:content-['/']" : "before:content-['/']"}
					${currentPage === page.slug ? ` text-primary` : "text-muted-foreground"}`}
					>
						{page.title}
					</span>
				</Button>

				<MoreHorizontal className="w-4 h-4 opacity-70 group-hover:opacity-100" />
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center justify-between pl-4 pr-2 py-2 text-sm font-semibold text-foreground">
				<span>Pages</span>
				<Button
					className="h-auto py-1"
					onClick={handleAddPage}
					size="sm"
					variant="ghost"
				>
					<Plus className="w-4 h-4" />
				</Button>
			</div>

			{Array.isArray(pages) && pages.length > 0 ? (
				pages
					.filter((page: Page) => !page.parentId)
					.map((page: Page) => (
						<div key={page.id}>
							{renderPage(page)}
							{pages
								.filter((p: Page) => p.parentId === page.id)
								.map((child: Page) => renderPage(child, true))}
						</div>
					))
			) : (
				<div className="px-4 py-2 text-sm text-muted-foreground">
					No pages available
				</div>
			)}
		</div>
	);
}

export default function BuilderTabPagesPages() {
	return (
		<Suspense fallback={<div>Loading pages...</div>}>
			<PagesList />
		</Suspense>
	);
}
