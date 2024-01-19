import Header from "../components/Header";

const Layout = ({ className, children }) => {
  return (
    <main className={`lg:px-7 px-4 w-full`}>
      <Header />
      <main className={className}>{children}</main>
    </main>
  );
};

export default Layout;
