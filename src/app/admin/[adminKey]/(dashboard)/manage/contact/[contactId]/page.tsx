import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import { contactByIdOptions } from "@/feature/contact/options/contactByIdOptions";
import { getQueryClient } from "@/lib/getQueryClient";

interface PageProps {
	params: Promise<{
		contactId: string;
	}>;
}

export default async function Page({ params }: PageProps) {
	const { contactId } = await params;

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(contactByIdOptions(contactId));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4">
				<DashboardTitle
					hasBackButton
					subtitle="ViewContact"
					title="ViewContact"
					translationNamespace="Contacts"
				/>
				<div className="p-12">
					{/*<ContactDetail contactId={contactId} />*/}
				</div>
			</section>
		</HydrationBoundary>
	);
}
