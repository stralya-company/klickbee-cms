import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { LogoSettings } from "@/builder/types/LogoSettings";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
	logos: LogoSettings[];
	onChange: (_logos: LogoSettings[]) => void;
};

const FORMATS: Array<LogoSettings["format"]> = ["square", "rectangle"];
const SIZES = {
	square: { w: 120, h: 120 },
	rectangle: { w: 180, h: 80 },
} as const;

export default function LogoEditor({ logos, onChange }: Props) {
	const t = useTranslations("LogoEditor");
	const [loading, setLoading] = useState<LogoSettings["format"] | null>(null);
	const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

	const LABELS = {
		square: t("SquareLogo"),
		rectangle: t("RectangleLogo"),
	} as const;

	const getLogoUrl = (format: LogoSettings["format"]) =>
		logos.find((l) => l.format === format)?.url;

	const handleFileChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		format: LogoSettings["format"],
	) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!["image/png", "image/jpeg"].includes(file.type)) {
			toast.error(t("FileTypeError"));
			return;
		}
		setLoading(format);
		const formData = new FormData();
		formData.append("logo", file);
		try {
			const res = await fetch("/api/admin/builder/logo", {
				method: "POST",
				body: formData,
			});
			if (!res.ok) throw new Error();
			const { url } = await res.json();
			// Remplace ou ajoute le logo pour ce format
			const next = logos.filter((l) => l.format !== format);
			onChange([...next, { format, url }]);
		} catch {
			toast(t("UploadError"));
		} finally {
			setLoading(null);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("Title")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-6">
					{FORMATS.map((format) => {
						const { w, h } = SIZES[format];
						const url = getLogoUrl(format);
						const isLoading = loading === format;
						return (
							<div
								key={format}
								className="flex flex-col items-center"
							>
								<Label>{LABELS[format]}</Label>
								<div className="mt-2" style={{ width: w }}>
									<div
										style={{
											width: w,
											height: h,
											borderRadius: 8,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											cursor: isLoading
												? "not-allowed"
												: "pointer",
											overflow: "hidden",
											position: "relative",
										}}
										className="border border-[#ccc] bg-[#fafafa] dark:border-[#444] dark:bg-[#222] transition-colors"
										onClick={() =>
											!isLoading &&
											inputRefs.current[format]?.click()
										}
										aria-label={t("SelectLogo")}
									>
										{url ? (
											<Image
												src={url}
												alt={LABELS[format]}
												width={w}
												height={h}
												style={{
													maxWidth: "100%",
													maxHeight: "100%",
													objectFit: "contain",
												}}
											/>
										) : (
											<span
												style={{
													color: "#bbb",
													fontSize: 14,
													textAlign: "center",
												}}
											>
												{t("ClickToChoose")}
												<br />
												{LABELS[format].toLowerCase()}
											</span>
										)}
										<input
											ref={(el) => {
												inputRefs.current[format] = el;
											}}
											type="file"
											accept="image/png,image/jpeg"
											style={{ display: "none" }}
											onChange={(e) =>
												handleFileChange(e, format)
											}
											disabled={isLoading}
										/>
									</div>
									{isLoading && (
										<div className="mt-2 text-xs text-muted-foreground text-center">
											{t("Uploading")}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
