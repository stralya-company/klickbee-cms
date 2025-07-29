import { queryOptions } from "@tanstack/react-query";
import { getContactById } from "@/feature/contact/lib/contacts";
import { getMockContactById } from "@/feature/contact/lib/mockContacts";

export const contactByIdOptions = (contactId: string) =>
	queryOptions({
		queryFn: async () => {
			if (process.env.NODE_ENV === "development") {
				return getMockContactById(parseInt(contactId));
			}
			return await getContactById(contactId);
		},
		queryKey: ["contact", contactId] as const,
	});
