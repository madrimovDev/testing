import {
	Drawer as ADrawer,
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	Row,
	Select,
} from "antd";
import { useGetTeachers } from "../../queries/teachers";
import { useGetDirections } from "../../queries/directions";
import { useGetRooms } from "../../queries/rooms";
import { MinusCircleFilled } from "@ant-design/icons";
import { useGetLessonTypes } from "../../queries/lesson-types";
import dayjs, { Dayjs } from "dayjs";
import { useCreateGroup } from "../../queries/groups";
import local from "antd/es/date-picker/locale/tk_TK";

import 'dayjs/locale/tk'
dayjs.locale('tk')
interface Props {
	open: boolean;
	onClose: VoidFunction;
}

const weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

interface Option {
	name: string;
	teacher_id: number;
	day: string;
	lesson_type_id: number;
	weekDays: number[];
}

interface FormItems {
	name: string;
	main_teacher: number;
	direction_id: number;
	room_id: number;
	start_date: Dayjs;
	start_time: Dayjs;
	options: Option[];
}

export default function Drawer({ onClose, open }: Props) {
	const {
		data: { teachers },
	} = useGetTeachers();
	const {
		data: { direction },
	} = useGetDirections();

	const {
		data: { rooms },
	} = useGetRooms();
	const {
		data: { lessonTypes },
	} = useGetLessonTypes();

	const { mutate } = useCreateGroup();

	const [form] = Form.useForm<FormItems>();
	const onFinish = () => {
		const obj = form.getFieldsValue(true) as FormItems;

		const makedObj: FormItems = {
			name: obj.name,
			direction_id: obj.direction_id,
			main_teacher: obj.main_teacher,
			room_id: obj.room_id,
			start_date: obj.start_date,
			start_time: obj.start_time,
			options: obj.options.map((o) => ({
				day: o.day,
				lesson_type_id: o.lesson_type_id,
				name: o.name,
				teacher_id: o.teacher_id,
				weekDays: o.weekDays,
			})),
		};
		mutate({
			name: makedObj.name,
			direction_id: makedObj.direction_id,
			lessonOptions: makedObj.options,
			main_teacher: makedObj.main_teacher,
			room_id: makedObj.room_id,
			start_date: makedObj.start_date.toISOString(),
			start_time: dayjs(makedObj.start_time, {
				locale: "uz",
				utc: true,
			}).toISOString(),
		});
	};
	const rules = [{ required: true }];
	return (
		<>
			<ADrawer
				open={open}
				onClose={onClose}
			>
				<Form<FormItems>
					form={form}
					layout="vertical"
					onFinish={onFinish}
				>
					<Form.Item
						label="Name"
						name="name"
						required
						rules={rules}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Teacher"
						name="main_teacher"
						required
						rules={rules}
					>
						<Select
							options={
								teachers.map((d) => ({
									label: d.first_name,
									value: d.id,
								})) ?? []
							}
						/>
					</Form.Item>
					<Form.Item
						label="Direction"
						required
						name="direction_id"
						rules={rules}
					>
						<Select
							options={
								direction.map((d) => ({
									label: d.name,
									value: d.id,
								})) ?? []
							}
						/>
					</Form.Item>
					<Form.Item
						label="Room"
						name="room_id"
						rules={rules}
						required
					>
						<Select
							options={
								rooms.map((d) => ({
									label: d.name,
									value: d.id,
								})) ?? []
							}
						/>
					</Form.Item>
					<Row>
						<Col sm={12}>
							<Form.Item
								label="Start Date"
								name="start_date"
								rules={rules}
								required
							>
								<DatePicker
									className="w-full"
									picker="date"
								/>
							</Form.Item>
						</Col>
						<Col sm={12}>
							<Form.Item
								label="Start Time"
								name="start_time"
								rules={rules}
								required
							>
								<DatePicker
									className="w-full"
									picker="time"
									locale={local}
									showSecond={false}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Divider children={<>Lesson Options</>} />
					<Form.List
						name="options"
						rules={[
							{
								validator: async (_, names) => {
									if (!names || names.length < 1) {
										return Promise.reject(new Error("At least 1"));
									}
								},
							},
						]}
					>
						{(field, { add, remove }) => {
							return (
								<>
									<Button
										block
										className="mb-4"
										onClick={add}
									>
										Add Option
									</Button>
									{field.map((field) => {
										return (
											<div
												key={field.key}
												className="relative p-2"
											>
												<Form.Item
													label="Name"
													name={[field.name, "name"]}
												>
													<Input />
												</Form.Item>
												<Form.Item
													label="Teacher"
													name={[field.name, "teacher_id"]}
													required
													rules={rules}
												>
													<Select
														options={
															teachers.map((d) => ({
																label: d.first_name,
																value: d.id,
															})) ?? []
														}
													/>
												</Form.Item>
												<Form.Item
													label="Day"
													name={[field.name, "day"]}
												>
													<Select
														options={[
															{ label: "Even", value: "even" },
															{ label: "Odd", value: "odd" },
														]}
													/>
												</Form.Item>
												<Form.Item
													label="Lesson Type"
													name={[field.name, "lesson_type_id"]}
													rules={rules}
												>
													<Select
														options={lessonTypes.map((type) => ({
															label: type.name,
															value: type.id,
														}))}
													/>
												</Form.Item>
												<Form.Item
													label="Week Days"
													name={[field.name, "weekDays"]}
												>
													<Select
														mode="multiple"
														options={weekDays.map((day, index) => ({
															label: day,
															value: index,
														}))}
													/>
												</Form.Item>
												<Button
													className="absolute -top-2 -right-2"
													shape="circle"
													danger
													size="small"
													type="dashed"
													onClick={() => remove(field.name)}
													icon={<MinusCircleFilled />}
												/>
											</div>
										);
									})}
								</>
							);
						}}
					</Form.List>
					<Form.Item>
						<Button
							block
							type="primary"
							htmlType="submit"
						>
							Create
						</Button>
					</Form.Item>
				</Form>
			</ADrawer>
		</>
	);
}

