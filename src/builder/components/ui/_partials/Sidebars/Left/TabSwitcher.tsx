"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const tabs = ["Pages", "Layers", "Components"];

export default function BuilderTabSwitcher() {
	const [activeTab, setActiveTab] = React.useState("Pages");

	return (
		<div className="inline-flex items-center rounded-md bg-white p-1 text-sm font-medium py-4">
			<div className={"text-muted-foreground bg-muted p-2"}>
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
