import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

export interface Room {
	id: number;
	name: string;
	number: number;
	created_at: string;
	updated_at: string;
}
export const useGetRooms = () => {
	return useQuery({
		queryKey: ["rr"],
		queryFn: async () =>
			(await api.get<{ message: string; rooms: Room[] }>("/api/v1/room")).data,
		initialData: { message: "", rooms: [] },
	});
};

