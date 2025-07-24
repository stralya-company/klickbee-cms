import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import type { LogoSettings } from "@/builder/types/settings/LogoSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type Props = {
	logos: LogoSettings[];
	onChange: (_logos: LogoSettings[]) => void;
};

const FORMATS: Array<LogoSettings["format"]> = ["square", "rectangle"];
const SIZES = {
	rectangle: { h: 80, w: 180 },
	square: { h: 120, w: 120 },
} as const;

export default function LogoEditor({ logos, onChange }: Props) {
	const t = useTranslations("LogoEditor");
	const [loading, setLoading] = useState<LogoSettings["format"] | null>(null);
	const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

	const LABELS = {
		rectangle: t("RectangleLogo"),
		square: t("SquareLogo"),
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
				body: formData,
				method: "POST",
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
								className="flex flex-col items-center"
								key={format}
							>
								<Label>{LABELS[format]}</Label>
								<div className="mt-2" style={{ width: w }}>
									<div
										aria-label={t("SelectLogo")}
										className="border border-[#ccc] bg-[#fafafa] dark:border-[#444] dark:bg-[#222] transition-colors"
										onClick={() =>
											!isLoading &&
											inputRefs.current[format]?.click()
										}
										style={{
											alignItems: "center",
											borderRadius: 8,
											cursor: isLoading
												? "not-allowed"
												: "pointer",
											display: "flex",
											height: h,
											justifyContent: "center",
											overflow: "hidden",
											position: "relative",
											width: w,
										}}
									>
										{url ? (
											<Image
												alt={LABELS[format]}
												height={h}
												src={url}
												style={{
													maxHeight: "100%",
													maxWidth: "100%",
													objectFit: "contain",
												}}
												width={w}
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
											accept="image/png,image/jpeg"
											disabled={isLoading}
											onChange={(e) =>
												handleFileChange(e, format)
											}
											ref={(el) => {
												inputRefs.current[format] = el;
											}}
											style={{ display: "none" }}
											type="file"
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
