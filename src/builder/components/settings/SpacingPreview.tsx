// SpacingPreview.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";

type SpacingPreviewProps = {
	spacing: FormValues["spacing"];
};

export default function SpacingPreview({ spacing }: SpacingPreviewProps) {
	return (
		<>
			{spacing.map((space, idx) => (
				<Card key={idx}>
					<CardHeader>
						<CardTitle>
							Preview spacing: {space.key || `Spacing ${idx + 1}`}
						</CardTitle>
					</CardHeader>
					<CardContent
						style={{
							paddingTop: space.sectionPadding.default.top.min,
							paddingRight:
								space.sectionPadding.default.right.min,
							paddingBottom:
								space.sectionPadding.default.bottom.min,
							paddingLeft: space.sectionPadding.default.left.min,
							maxWidth: space.maxWidth,
							background: "#000",
							color: "#fff",
						}}
					>
						<p>I love Klickbee CMS! Woaw.</p>
					</CardContent>
				</Card>
			))}
		</>
	);
}
