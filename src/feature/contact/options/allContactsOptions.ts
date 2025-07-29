import { queryOptions } from "@tanstack/react-query";
import { getAllContacts } from "@/feature/contact/lib/contacts";
import { mockContacts } from "@/feature/contact/lib/mockContacts";

export const allContactsOptions = queryOptions({
	queryFn: async () => {
		if (process.env.NODE_ENV === "development") {
			return mockContacts;
		}
		return await getAllContacts();
	},
	queryKey: ["all_contacts"] as const,
});
