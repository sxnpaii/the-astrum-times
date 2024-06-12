import { styles } from "../assets/styles/Basics";
import Header from "../components/Header";
import "../index.scss";

export const metadata = {
  title: "The Astrum Times",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="root">
          <main className={`lg:px-7 px-4 w-full `}>
            <Header />
            {children}
            <style>{styles}</style>
          </main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
