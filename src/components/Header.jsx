import moment from "moment";
import sass from "@/assets/styles/components/Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header className={sass.Header}>
      <div className={sass.LogoBar}>
        <p className={sass.Date}>
          <b>{moment().format("dddd, Do MMMM, YYYY")}</b>
          <br />
          Todays paper
        </p>
        <h1 className={sass.TheTitle}>
          <Link href="/">The Astrum Times</Link>
        </h1>
        <span className={sass.Test}>ALPHA TEST</span>
      </div>
    </header>
  );
};

export default Header;
