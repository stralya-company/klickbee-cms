"use client";
import React from "react";
import { useAdminKeyStore } from "@/lib/stores/storeAdminKey";
import { useUserStore } from "@/lib/stores/storeUser";

export default function AdminPage() {
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const currentUser = useUserStore((state) => state.user);
	if (!adminKey) {
		/** Just for dev purposes, in production this should never happen */
	}
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-muted">
			<h1 className="text-2xl font-bold">
				Admin Page with key {adminKey}
			</h1>
			{currentUser && <p>Current user id is : {currentUser.id}</p>}
		</div>
	);
}
