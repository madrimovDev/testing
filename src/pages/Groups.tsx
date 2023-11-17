import { Button, Table, Typography } from "antd";
import { useGetGroups } from "../queries/groups";
import { useCallback, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Drawer from "../components/groups/Drawer";
import { Link } from "react-router-dom";

export default function Groups() {
	const { data, isFetching } = useGetGroups();
	const [open, setOpen] = useState(false);
	const Title = useCallback(
		() => (
			<div className="flex items-center justify-between p-2">
				<Typography.Text className="text-lg">Groups</Typography.Text>
				<Button
					type="primary"
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
						render(_, _r, i) {
							return i + 1;
						},
					},
					{
						key: "name",
						title: "Name",
						render(_, record) {
							return <Link to={`/group/${record.id}`}>{record.name}</Link>;
						},
					},
					{
						key: "sdate",
						title: "Start Date",
						render(_, record) {
							return new Intl.DateTimeFormat("ru", {
								dateStyle: "full",
							}).format(new Date(record.start_date));
						},
					},
					{
						key: "stime",
						title: "Start Time",
						render(_, record) {
							return new Intl.DateTimeFormat("ru", {
								dateStyle: "full",
							}).format(new Date(record.start_time));
						},
					},
					{
						key: "type",
						title: "Type",
						render(_, record) {
							return record.type;
						},
					},
					{
						key: "dir",
						title: "DIrection",
						render: (_, rec) => {
							return rec.Direction.name;
						},
					},
					{
						key: "teach",
						title: "Teacher",
						render: (_, rec) => {
							return rec.Teacher.User.first_name;
						},
					},
					{
						key: "rom",
						title: "Room",
						render: (_, rec) => {
							return rec.Room.name;
						},
					},
					{
						key: "Day",
						title: "Day",
						render: (_, rec) => {
							return rec.LessonOption.map((opt) => {
								return <span className="mr-2">{opt.day}</span>;
							});
						},
					},
					{
						key: "action",
						title: "",
						render() {
							return (
								<div className="flex justify-end">
									<Button.Group size="small">
										<Button
											type="primary"
											icon={<EditFilled />}
										/>
										<Button
											type="primary"
											danger
											icon={<DeleteFilled />}
										/>
									</Button.Group>
								</div>
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

