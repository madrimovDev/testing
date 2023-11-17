import { HomeFilled } from "@ant-design/icons";
import { Layout, Menu } from "antd";

export default function Sidebar() {
	return (
		<Layout.Sider
			collapsible
			theme="dark"
		>
			<Menu
				mode="vertical"
				className="px-2 mt-2"
				theme="dark"
				items={[
					{
						key: "home",
						title: "Home",
						label: "Home",
						icon: <HomeFilled />,
					},
				]}
			/>
		</Layout.Sider>
	);
}

