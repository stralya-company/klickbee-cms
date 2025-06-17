"use client";

import { useTranslation as useTransBase } from "react-i18next";

export function useTranslation(ns?: string) {
	return useTransBase(ns || "common");
}
