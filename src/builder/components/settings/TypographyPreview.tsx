import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";
import { toClamp } from "@/builder/lib/clampCalculator";
import { useGoogleFontLink } from "@/builder/utils/query/useGoogleFontLink";

type TypographyPreviewProps = {
	typography: FormValues["typography"];
};

function GoogleFontLoader({ fontFamily }: { fontFamily: string }) {
	useGoogleFontLink(fontFamily);
	return null;
}

export default function TypographyPreview({
	typography,
}: TypographyPreviewProps) {
	// Liste unique des familles de polices
	const fontFamilies = Array.from(
		new Set(typography.map((t) => t.fontFamily)),
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Preview typographies</CardTitle>
			</CardHeader>
			<CardContent className={"space-y-4"}>
				{fontFamilies.map((font) => (
					<GoogleFontLoader key={font} fontFamily={font} />
				))}
				{typography.map((typo, idx) => (
					<p
						key={
							typeof typo.id === "string" ||
							typeof typo.id === "number"
								? typo.id
								: idx
						}
						style={{
							fontFamily: typo.fontFamily,
							fontSize: toClamp(typo.fontSize),
							lineHeight: `${typo.lineHeight}${typo.lineHeightUnits}`,
							fontWeight: typo.fontWeight,
							fontStyle: typo.fontStyle,
							letterSpacing: `${typo.letterSpacing}${typo.letterSpacingUnits}`,
						}}
					>
						<b>{typo.key as string}</b> : I love Klickbee CMS! Woaw.
					</p>
				))}
			</CardContent>
		</Card>
	);
}
