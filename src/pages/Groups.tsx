import { Button, Table, Typography } from "antd";
import { useGetGroups } from "../queries/groups";
import { useCallback, useState } from "react";
import Drawer from "../components/groups/Drawer";

export default function Groups() {
	const { data, isFetching } = useGetGroups();
	const [open, setOpen] = useState(false);
	const Title = useCallback(
		() => (
			<div className="flex items-center justify-between p-2">
				<Typography.Text className="text-lg">Groups</Typography.Text>
				<Button
					type="primary"
					ghost
					onClick={() => setOpen(true)}
				>
					Create
				</Button>
			</div>
		),
		[]
	);

	return (
		<div className="p-4">
			<Table
				size="small"
				loading={isFetching}
				pagination={false}
				title={Title}
				dataSource={data?.groups}
				columns={[
					{
						key: "#",
						title: "#",
						render(_, _record, index) {
							return index + 1;
						},
					},
					{
						key: "name",
						title: "Name",
						render(_, record) {
							return record.name;
						},
					},
					{
						key: "name",
						title: "Direction",
						render(_, record) {
							return record.Direction.name;
						},
					},
					{
						key: "days",
						title: "Days",
						children: [
							{
								key: "d",
								title: "Day",
								render(value, record, index) {
									return record.LessonOption.map((o) => o.day);
								},
							},
						],
					},
					{
						key: "teacher",
						title: "Teacher",
						render(_, record) {
							return record.Teacher.User.first_name;
						},
					},
					{
						key: "Date",
						title: "Started Date",
						render(_, record) {
							return new Intl.DateTimeFormat("ru").format(
								new Date(record.start_date)
							);
						},
					},
				]}
			/>
			<Drawer
				open={open}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}

