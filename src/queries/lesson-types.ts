import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

export interface LessonType {
	id: number;
	name: string;
}

export const useGetLessonTypes = () => {
	return useQuery({
		queryKey: ["lt"],
		queryFn: async () =>
      (await api.get<{ message: string, lessonTypes: LessonType[] }>("/api/v1/lesson-type")).data,
    initialData: {message: '', lessonTypes: []}
	});
};
