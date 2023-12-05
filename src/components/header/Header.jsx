// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../../styles/main.scss";
import "./header.scss";
import menu from "../../assets/menu.svg";
import search from "../../assets/search-icon.svg";
import LogoImg from "../../assets/the-astrum-times.svg";
import exitIcon from "../../assets/exit-icon.svg"; // Replace with your actual exit icon

const Header = () => {
  const [modal, setModal] = useState(false);

  // Toggle modal state
  const toggleModal = () => {
    setModal(!modal);
  };

  // Render menu modal content
  const MenuModal = () => {
    return (
      <div className="menu-modal">
        <ul className="modal-nav-list">
          <li className="modal-nav-item">
            <button className="exit-button" onClick={toggleModal}>
              <img src={exitIcon} alt="Exit icon" />
            </button>
          </li>
          <li className="modal-nav-item">
            <button className="eng uppercase" type="button">
              Eng
            </button>
          </li>
          <li className="modal-nav-item">
            <button className="uz uppercase" type="button">
              UZ
            </button>
          </li>
          <li className="modal-nav-item">
            <button className="rus uppercase" type="button">
              rus
            </button>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="header-top">
          <div className="menu-search">
            <img
              className="menu"
              onClick={toggleModal}
              src={menu}
              alt="menu icon"
            />
            <img className="search" src={search} alt="search icon" />
          </div>

          <ul className="nav-list">
            <li className="nav-item">
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
            <strong className="date">Thursday, November 9, 2023</strong>
            <p className="today">Today’s Paper</p>
          </div>

          <a href="#" className="site-logo-link">
            <img className="site-logo-img" src={LogoImg} alt="site logo" />
          </a>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {modal && <MenuModal />}
    </header>
  );
};

export default Header;
