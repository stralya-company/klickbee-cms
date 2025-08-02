import { Ellipsis, MoveRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function AdminContentPage() {
	const user = {
		name: "Louis",
	};

	const contents = [
		{
			collection: "Project",
			name: "Lorem ipsum is simply dummy text",
			profil: "/logo-square-default.png",
			SEO: 100,
			statut: "Published",
		},
		{
			collection: "Project",
			date: "2025-06-11T12:30:00Z",
			name: "Lorem ipsum is simply dummy text",
			profil: "/logo-square-default.png",
			SEO: 100,
			statut: "Schelduled",
		},
		{
			collection: "Project",
			date: "2025-06-09T12:30:00Z",
			name: "Lorem ipsum is simply dummy text",
			profil: "/logo-square-default.png",
			SEO: 100,
			statut: "Schelduled",
		},
		{
			collection: "Project",
			name: "Lorem ipsum is simply dummy text",
			profil: "/logo-square-default.png",
			SEO: 50,
			statut: "Draft",
		},
		{
			collection: "Project",
			name: "Lorem ipsum is simply dummy text",
			profil: "/logo-square-default.png",
			SEO: 0,
			statut: "Draft",
		},
	];

	const colorSeo = (seoReview: number) => {
		if (seoReview > 80) return "bg-green-200 text-green-500";
		if (seoReview < 80 && seoReview >= 50)
			return "bg-orange-200 text-orange-500";
		else return "bg-red-200 text-red-500";
	};

	const colorStatut = (statut: string) => {
		if (statut === "Published") return "bg-green-200 text-green-500";
		if (statut === "Draft") return "bg-red-200 text-red-500";
		else return "bg-blue-200 text-blue-500";
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};
	return (
		<>
			<div className="border-b border-gray-300 p-10">
				<h1 className="font-medium text-4xl ">
					Welcome <span className="text-blue-500 ">{user.name}</span>
				</h1>
				<p className="text-lg">Manage your content your way.</p>
			</div>
			<div className="p-10">
				<div className="flex justify-between mb-5">
					<h2 className="font-medium text-lg">Your last content</h2>
					<Button className="bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white">
						Go to Content Manager <MoveRight />{" "}
					</Button>
				</div>
				<div className="border border-gray-300 rounded-lg overflow-hidden ">
					<Table className="w-full">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50%]">
									<Checkbox /> Name
								</TableHead>
								<TableHead>Collection</TableHead>
								<TableHead>Profil</TableHead>
								<TableHead>Statut</TableHead>
								<TableHead>SEO</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{contents.map((content, index) => (
								<TableRow key={index}>
									<TableCell className="text-blue-500 w-[50%]">
										<Checkbox /> {content.name}
									</TableCell>
									<TableCell>{content.collection}</TableCell>
									<TableCell>
										<Image
											alt="profil photo"
											className="rounded-full"
											height={50}
											src={content.profil}
											width={50}
										/>
									</TableCell>

									<TableCell>
										<span
											className={`rounded-lg font-medium p-2 ${colorStatut(
												content.statut,
											)}`}
										>
											{content.statut}{" "}
											{content.date &&
												formatDate(content.date)}
										</span>
									</TableCell>

									<TableCell>
										<span
											className={`rounded-lg font-medium p-2 ${colorSeo(
												content.SEO,
											)}`}
										>
											{content.SEO}%
										</span>
									</TableCell>

									<TableCell>
										<button className=" text-gray-500 hover:text-gray-300">
											<Ellipsis />
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	);
}
