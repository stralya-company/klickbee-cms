import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useSetting(key: string, userId?: string | null) {
	return useQuery({
		queryKey: ["setting", key, userId],
		queryFn: async () => {
			const params = new URLSearchParams({
				key,
				...(userId ? { userId } : {}),
			});
			const res = await fetch(`/api/settings?${params}`);
			if (!res.ok) throw new Error("Erreur de chargement");
			return res.json() as Promise<{ value: string | null }>;
		},
	});
}

export function useSetSetting() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			key: string;
			value: string;
			userId?: string;
		}) => {
			const res = await fetch("/api/settings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Erreur de sauvegarde");
			return res.json();
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["setting", variables.key, variables.userId],
			});
		},
	});
}
