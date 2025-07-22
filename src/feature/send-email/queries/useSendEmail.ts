import { useMutation } from "@tanstack/react-query";

export function useSendEmail() {
	return useMutation({
		mutationFn: async (data: {
			to: string;
			subject: string;
			text: string;
		}) => {
			const res = await fetch("/api/admin/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Error sending email");
			return res.json();
		},
	});
}
