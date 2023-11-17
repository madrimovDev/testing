import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../config/api";
import { client } from "../main";

export interface Group {
	id: number;
	name: string;
	direction_id: number;
	start_time: string;
	start_date: string;
	main_teacher: number;
	room_id: number;
	type: string;
	created_at: string;
	updated_at: string;
	Direction: Direction;
	LessonOption: LessonOption[];
	Teacher: Teacher;
	Room: Room;
}

export interface LessonOption {
	id: number;
	name: string | null;
	lesson_type_id: number;
	group_id: number;
	day: string;
	teacher_id: number;
}

export interface Direction {
	id: number;
	name: string;
	price: number;
	month: number;
	lesson_duration: number;
	direction_type_id: number;
	status: string;
	created_at: string;
	updated_at: string;
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

export interface Room {
	id: number;
	name: string;
	number: number;
	created_at: string;
	updated_at: string;
}

export const useGetGroups = () => {
	return useQuery({
		queryKey: ["gr"],
		queryFn: async () =>
			(await api.get<{ message: string; groups: Group[] }>("/api/v1/group"))
				.data,
	});
};
export interface CreateLessonOption {
	teacher_id: number;
	lesson_type_id: number;
	name?: string;
	day?: string;
	weekDays?: number[];
}

export interface CreateGroup {
	name: string;
	direction_id: number;
	room_id: number;
	main_teacher: number;
	start_time: string; // time
	start_date: string; // date
	lessonOptions: CreateLessonOption[];
}
export const useCreateGroup = () => {
	return useMutation({
		mutationKey: ["cgr"],
		mutationFn: (body: CreateGroup) => api.post("/api/v1/group", body),
		onSuccess() {
			client.invalidateQueries({ queryKey: ["gr"] });
		},
	});
};
