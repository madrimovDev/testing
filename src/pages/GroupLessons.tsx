import { useParams } from "react-router-dom";
import { useGetLessons } from "../queries/lessons";
import { Badge, Calendar, Space, Switch, Table, Typography } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useState } from "react";
dayjs.locale("ru");

export default function GroupLessons() {
	const { id } = useParams();
	const {
		data: { lessons },
	} = useGetLessons(id ? +id : 0);
	const [isCalendar, setIsCalendar] = useState(true);
	return (
		<div className="p-4">
			<Space className="flex items-center gap-2 py-4">
				<Typography.Text>Table</Typography.Text>
				<Switch
					defaultChecked
					onChange={(checked) => setIsCalendar(checked)}
				/>
				<Typography.Text>Calendar</Typography.Text>
			</Space>
			{!isCalendar && (
				<Table
					dataSource={lessons}
					columns={[
						{
							key: "#",
							title: "#",
							render(_value, _record, index) {
								return index + 1;
							},
						},
						{
							key: "Name",
							title: "Name",
							render(_value, record, _index) {
								return record.name ?? "Empty";
							},
						},
						{
							key: "desk",
							title: "Description",
							render(_value, record, _index) {
								return record.description ?? "Empty";
							},
						},
						{
							key: "Date",
							title: "Date",
							render(_value, record, _index) {
								return dayjs(record.date).format("DD.MM.YYYY dd");
							},
						},
						{
							key: "Date",
							title: "Date",
							render(_value, record, _index) {
								return record.Teacher.User.first_name ?? "Empty";
							},
						},
					]}
				/>
			)}
			{isCalendar && (
        <Calendar
					cellRender={(date, info) => {
						const finded = lessons.find((lesson) => {
							const d = dayjs(lesson.date);
							if (
								d.date() === date.date() &&
								d.month() === date.month() &&
								d.year() === date.year()
							)
								return true;
						});
						if (finded)
							return (
                <div className="">
                  <Badge />
									{finded.Teacher.User.first_name}
								</div>
							);
					}}
				/>
			)}
		</div>
	);
}

