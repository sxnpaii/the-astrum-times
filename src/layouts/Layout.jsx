import Header from "../components/Header";

const Layout = ({ className, children }) => {
  return (
    <main className={`sm:mx-7 mx-3`}>
      <Header />
      <main className={className}>{children}</main>
    </main>
  );
};

export default Layout;
