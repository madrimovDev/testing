import { Layout } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Groups from "../../pages/Groups";
import GroupLessons from "../../pages/GroupLessons";

const { Content, Footer } = Layout;
export default function LayoutC() {
	return (
		<>
			<Layout style={{ height: "100vh" }}>
				<Header />
				<Layout>
					<Sidebar />
					<Layout className="overflow-hidden">
						<Content className="overflow-auto">
							<Routes>
								<Route
									path="/"
									element={<Groups />}
								/>
								<Route
									path="/group/:id"
									element={<GroupLessons />}
								/>
							</Routes>
						</Content>
						<Footer>Footer</Footer>
					</Layout>
				</Layout>
			</Layout>
		</>
	);
}

