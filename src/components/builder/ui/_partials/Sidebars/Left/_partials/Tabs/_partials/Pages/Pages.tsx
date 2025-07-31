"use client";
import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";

type Page = {
	id: string;
	title: string;
	slug: string;
	type: "homepage" | "default";
	parentId?: string;
};

const pages: Page[] = [
	{ id: "1", slug: "/", title: "Home", type: "homepage" },
	{ id: "2", slug: "/services", title: "Services", type: "default" },
	{
		id: "3",
		parentId: "2",
		slug: "/services/real-estate",
		title: "Real Estate",
		type: "default",
	},
	{ id: "4", slug: "/who-we-are", title: "Who-we-are", type: "default" },
	{ id: "5", slug: "/privacy", title: "Privacy", type: "default" },
	{ id: "6", slug: "/terms", title: "Terms", type: "default" },
];

export default function BuilderTabPagesPages() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const handleCurrentPageSwitch = (newCurrentSlug: string) => {
		useCurrentPageStore.setState({
			currentPage: newCurrentSlug,
		});
	};
	const renderPage = (page: Page, isChild = false) => (
		<div
			className={`group flex items-center justify-between px-4 text-sm  hover:bg-muted rounded-sm`}
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
				${page.type == "homepage" ? "after:content-['/']" : "before:content-['/']"}
				${currentPage == page.slug ? ` text-black font-bold` : "text-muted-foreground"}`}
				>
					{page.title}
				</span>
			</Button>

			<MoreHorizontal className="w-4 h-4 opacity-70 group-hover:opacity-100" />
		</div>
	);

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-foreground">
				<span>Pages</span>
				<Button className="h-auto p-1" size="sm" variant="ghost">
					<Plus className="w-4 h-4" />
				</Button>
			</div>

			{pages
				.filter((page) => !page.parentId)
				.map((page) => (
					<div key={page.id}>
						{renderPage(page)}
						{pages
							.filter((p) => p.parentId === page.id)
							.map((child) => renderPage(child, true))}
					</div>
				))}
		</div>
	);
}
