import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

export interface Teacher {
	id: number;
	user_id: number;
	first_name: string;
	last_name: string;
	role: string;
	username: string;
	phone: string;
	status: string;
	direction: [
		{
			name: string;
			id: number;
		}
	];
}

export const useGetTeachers = () => {
	return useQuery({
		queryKey: ["teacher"],
		queryFn: async () =>
			(
				await api.get<{ message: string; teachers: Teacher[] }>(
					"/api/v1/teacher"
				)
			).data,
    initialData: { message: "", teachers: [] }
	});
};

