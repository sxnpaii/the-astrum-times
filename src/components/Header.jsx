import sass from "../assets/styles/components/Header.module.scss"

const Header = () => {
  return (
    <header className={sass.Header}>
      <div className={sass.LogoBar}>
        <p className={sass.Date}>
          <b>
            {new Date().toDateString()}
          </b>
          <br />
          Todays paper
        </p>
        <h1 className={sass.TheTitle}>
          <a href="/">
            The Astrum News
          </a>
        </h1>
        <span className={sass.Test}>in test mode</span>
      </div>
    </header>
  )
}

export default Header;
