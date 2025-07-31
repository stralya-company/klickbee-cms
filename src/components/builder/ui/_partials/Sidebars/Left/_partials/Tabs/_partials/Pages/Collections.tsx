"use client";

import { ChevronDown, ChevronUp, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Template = {
	id: string;
	title: string;
	slug: string;
};

type Collection = {
	id: string;
	title: string;
	slug: string;
	templates: Template[];
};

const collections: Collection[] = [
	{
		id: "1",
		slug: "/project-showcase",
		templates: [
			{
				id: "1",
				slug: "/project-showcase/template-1",
				title: "Template 1",
			},
		],
		title: "Project Showcase",
	},
	{
		id: "2",
		slug: "/our-news",
		templates: [],
		title: "Our News",
	},
];

export default function BuilderTabPagesCollections() {
	const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

	const toggleOpen = (id: string) => {
		setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center justify-between px-4 pt-6 pb-2 text-sm font-medium text-muted-foreground">
				<span>Content Collections</span>
				<Button className="h-auto p-1" size="sm" variant="ghost">
					<Plus className="w-4 h-4" />
				</Button>
			</div>

			{collections.map((collection) => {
				const isOpen = openMap[collection.id] ?? true;
				return (
					<div className="flex flex-col" key={collection.id}>
						<div
							className="group flex items-center justify-between px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-sm cursor-pointer"
							onClick={() => toggleOpen(collection.id)}
						>
							<span className="truncate">{collection.slug}</span>
							{isOpen ? (
								<ChevronUp className="w-4 h-4 text-muted-foreground" />
							) : (
								<ChevronDown className="w-4 h-4 text-muted-foreground" />
							)}
						</div>

						{isOpen && (
							<div className="flex flex-col gap-1">
								{collection.templates.map((template) => (
									<div
										className="group flex items-center justify-between px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-sm"
										key={template.id}
									>
										<span className="pl-6 before:content-['—'] before:mr-1 truncate">
											{template.title}
										</span>
										<MoreHorizontal className="w-4 h-4 opacity-70 group-hover:opacity-100" />
									</div>
								))}
								<Link
									className="pl-6 py-1.5 px-4 text-sm text-blue-600 hover:underline"
									href="#"
								>
									Create template
								</Link>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
