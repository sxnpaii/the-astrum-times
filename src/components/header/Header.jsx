// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import "../../styles/main.scss";
import "./header.scss";
import menu from "../../assets/menu.svg";
import search from "../../assets/search-icon.svg";
import LogoImg from "../../assets/the-astrum-times.svg";

const header = () => {
  return (
    <header className="site-header">
      <div className="site-container">
        <div className="header-top">
          <div className="menu-search">
            <img className="menu" src={menu} alt="menu icon" />
            <img className="search" src={search} alt="search icon" />
          </div>

          <ul className="nav-list">
            <li className="nav-item ">
              <button className="eng uppercase" type="button">
                Eng
              </button>
            </li>
            <li className="nav-item">
              <button className="uz uppercase" type="button">
                UZ
              </button>
            </li>
            <li className="nav-item">
              <button className="rus uppercase" type="button">
                rus
              </button>
            </li>
          </ul>

          <a className="login">Log In</a>
        </div>

        <div className="header-bottom">
          <div className="date-wrapper">
            <p className="date">Thursday, November 9, 2023</p>
            <p className="today">Today’s Paper</p>
          </div>

          <a href="#" className="site-logo-link">
            <img className="site-logo-img" src={LogoImg} alt="site logo" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default header;
