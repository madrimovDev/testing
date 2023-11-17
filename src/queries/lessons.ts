import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

export interface Lesson {
	id: number;
	name: string | null;
	description: string | null;
	teacher_id: number;
	lesson_type_id: number;
	date: string;
	created_at: string;
	updated_at: string;
	group_id: number;
	Teacher: Teacher;
	Attendance: [];
	_count: Count;
}

export interface Teacher {
	id: number;
	user_id: number;
	teacher_type_id: number;
	status: string;
	created_at: string;
	updated_at: string;
	User: {
		first_name: string;
		last_name: string;
	};
}

export interface Count {
	Attendance: number;
}

export const useGetLessons = (id: number) => {
	return useQuery({
		queryKey: ["lesson", id],
		queryFn: async () =>
			(
				await api.get<{ message: string; lessons: Lesson[] }>(
					"/api/v1/lesson/group/" + id
				)
			).data,
		initialData: { message: "", lessons: [] },
	});
};

