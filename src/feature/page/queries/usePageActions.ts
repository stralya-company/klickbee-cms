import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	deletePage,
	duplicatePage,
	setAsHomePage,
} from "@/feature/page/actions/pageActions";
import { PageLight } from "@/feature/page/types/page";

/**
 * Hook for duplicating a page
 */
export function useDuplicatePage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (pageId: number) => duplicatePage(pageId),
		onSuccess: () => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

/**
 * Hook for deleting a page
 */
export function useDeletePage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (pageId: number) => deletePage(pageId),
		onSuccess: () => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

/**
 * Hook for setting a page as the home page
 */
export function useSetAsHomePage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (pageId: number) => setAsHomePage(pageId),
		onSuccess: () => {
			// Invalidate both the pages query and the current_homepage_id setting
			queryClient.invalidateQueries({ queryKey: ["pages"] });
			queryClient.invalidateQueries({
				queryKey: ["settings", "current_homepage_id"],
			});
		},
	});
}
