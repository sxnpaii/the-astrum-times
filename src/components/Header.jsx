import moment from "moment";
import sass from "../assets/styles/components/Header.module.scss";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/">The Astrum Times</NavLink>
        </h1>
        <span className={sass.Test}>NIGHTLY DEV</span>
      </div>
    </header>
  );
};

export default Header;
