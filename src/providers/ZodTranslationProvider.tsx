"use client";

import { useMessages } from "next-intl";
import { useEffect } from "react";
import { initializeGlobalZodErrorMap } from "@/lib/zod/zodTranslation";

interface ZodTranslationProviderProps {
	children: React.ReactNode;
}

export function ZodTranslationProvider({
	children,
}: ZodTranslationProviderProps) {
	const messages = useMessages();

	useEffect(() => {
		const validationMessages = messages?.Validation || {};
		initializeGlobalZodErrorMap(validationMessages);
	}, [messages]);

	return <>{children}</>;
}
