"use client";
import { useState } from "react";

export default function AdminPage({
	params,
}: {
	params: { adminKey: string };
}) {
	const [adminKey] = useState(params.adminKey);
	if (!adminKey) {
		/** Just for dev purposes, in production this should never happen */
	}
}
