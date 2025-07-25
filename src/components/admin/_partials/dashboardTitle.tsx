interface DashboardTitleProps {
	title: string;
	subtitle?: string;
	backLink?: string;
}

export default function DashboardTitle({
	title,
	subtitle,
	backLink,
}: DashboardTitleProps) {
	return (
		<div className="flex flex-col gap-2 px-12 pb-12 border-b">
			<div className="flex items-center gap-2">
				{backLink && (
					<a
						className="text-blue-500 hover:underline"
						href={backLink}
					>
						Back
					</a>
				)}
				<h1 className="text-2xl font-bold">{title}</h1>
			</div>
			{subtitle && <p className="text-gray-600">{subtitle}</p>}
		</div>
	);
}
