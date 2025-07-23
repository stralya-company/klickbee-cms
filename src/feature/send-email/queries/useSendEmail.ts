import { useMutation } from "@tanstack/react-query";

export function useSendEmail() {
	return useMutation({
		mutationFn: async (data: {
			to: string;
			subject: string;
			text: string;
		}) => {
			const res = await fetch("/api/admin/send-email", {
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			if (!res.ok) throw new Error("Error sending email");
			return res.json();
		},
	});
}
