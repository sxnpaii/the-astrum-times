import loading from "../assets/images/loading.svg";
import sass from "../assets/styles/components/Loading.module.scss";

const Loading = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className={sass.Loading}>
        <img src={loading} alt="Animation" className={sass.Animation} />
        <p className={sass.Text}>HAVE A NICE TRIP !</p>
      </div>
    );
  } else null;
};

export default Loading;
