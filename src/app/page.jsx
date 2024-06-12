// "use client";
import { GetAllData } from "../firebase/Requests";
// sections
import Posts from "../sections/HomePage/Posts";
import RightSide from "../sections/HomePage/RightSide";
import Loading from "../components/Loading";
// components
import NotFound from "../components/NotFound";
// styles
import sass from "../assets/styles/pages/HomePage.module.scss";

const HomePage = async () => {
  const fetchData = async () => {
    try {
      const response = await GetAllData();
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  const getData = await fetchData();

  return getData.length !== 0 ? (
    <main className={sass.HomePageLayer}>
      {/* sections */}
      <Posts getData={getData.filter((el) => !el.is_event)} />
      <RightSide events={getData.filter((el) => el.is_event)} />
    </main>
  ) : (
    <Loading isLoading={true} />
  );
};

export default HomePage;
