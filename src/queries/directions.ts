import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

export interface Direction {
	id: number;
	name: string;
	price: number;
	month: number;
	lesson_duration: number;
}

export const useGetDirections = () => {
	return useQuery({
		queryKey: ["dr"],
		queryFn: async () =>
			(
				await api.get<{ message: string; direction: Direction[] }>(
					"/api/v1/direction"
				)
			).data,
		initialData: { message: "", direction: [] },
	});
};

