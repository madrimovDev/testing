import { Layout, Typography } from "antd";
export default function Header() {
	return (
		<Layout.Header className="flex items-center">
			<Typography.Title
				level={4}
				className="!mb-0"
			>
				Testing
			</Typography.Title>
		</Layout.Header>
	);
}

