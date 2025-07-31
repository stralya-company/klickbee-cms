"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const tabs = ["Pages", "Layers", "Components"];

export default function BuilderTabSwitcher({
	activeTab,
	setActiveTab,
}: {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}) {
	return (
		<div className="inline-flex items-center p-1 text-sm font-medium py-4">
			<div className="text-muted-foreground bg-muted rounded-md p-2 m-auto">
				{tabs.map((tab) => (
					<button
						className={cn(
							"px-2 py-1.5 rounded-sm transition-colors",
							activeTab === tab
								? "bg-background text-foreground shadow-sm"
								: "hover:text-foreground",
						)}
						key={tab}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>
		</div>
	);
}
