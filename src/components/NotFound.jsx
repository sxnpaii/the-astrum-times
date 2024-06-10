import sass from "../assets/styles/components/NotFound.module.scss";

const NotFound = ({ message }) => {
  return (
    <div className={sass.NotFound}>
      <h6 className={sass.Message}>{message}</h6>
    </div>
  );
};

export default NotFound;
