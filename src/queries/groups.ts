import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../config/api";
import { client } from "../main";

export interface Group {
  id: number
  name: string
  direction_id: number
  start_date: string
  main_teacher: number
  type: string
  created_at: string
  updated_at: string
  lesson_count: number
  Direction: Direction
  LessonOption: LessonOption[]
  Teacher: Teacher
}

export interface Direction {
  id: number
  name: string
  prefix: string
  price: number
  month: number
  lesson_duration: number
  direction_type_id: number
  status: string
  created_at: string
  updated_at: string
}

export interface LessonOption {
  id: number
  lesson_type_id: number
  group_id: number
  room_id: number
  teacher_id: number
  time: string
  day: string
}

export interface Teacher {
  id: number
  user_id: number
  teacher_type_id: number
  status: string
  created_at: string
  updated_at: string
  User: User
}

export interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  password: string
  role: string
  phone: string
  status: string
  created: string
  updated: string
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
	room_id: number
	time: string
}

export interface CreateGroup {
	name: string;
	direction_id: number;
	main_teacher: number;
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
