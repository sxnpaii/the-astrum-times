import { Outlet } from "react-router";
import Header from "../components/Header";

const Layout = () => {
  return (
    <main className={`lg:px-7 px-4 w-full`}>
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
