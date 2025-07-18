// SpacingPreview.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";

type SpacingPreviewProps = {
	spacing: FormValues["spacing"];
};

export default function SpacingPreview({ spacing }: SpacingPreviewProps) {
	return (
		<>
			{spacing.sectionPadding.map((space, idx) => (
				<Card key={idx}>
					<CardHeader>
						<CardTitle>
							Preview spacing: {space.key || `Spacing ${idx + 1}`}
						</CardTitle>
					</CardHeader>
					<CardContent
						style={{
							paddingTop: space.top.min,
							paddingRight: space.right.min,
							paddingBottom: space.bottom.min,
							paddingLeft: space.left.min,
							maxWidth: spacing.maxWidth,
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
