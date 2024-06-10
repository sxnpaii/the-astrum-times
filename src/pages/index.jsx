import { useEffect, useState } from "react";
import { GetAllData } from "../firebase/Requests";
// sections
import Posts from "../sections/HomePage/Posts";
import RightSide from "../sections/HomePage/RightSide";
import Loading from "../components/Loading";
// components
import NotFound from "../components/NotFound";
// styles
import sass from "../assets/styles/pages/HomePage.module.scss";

const HomePage = () => {
  const [getData, setGettingData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setGettingData(await GetAllData());
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    // console.log(getData)
  }, []);

  if (getData) {
    return (
      <main className={sass.HomePageLayer}>
        {/* sections */}
        <Posts getData={getData.filter((el) => !el.is_event)} />
        <RightSide events={getData.filter((el) => el.is_event)} />
      </main>
    );
  } else {
    return isLoading ? (
      <Loading isLoading={isLoading} />
    ) : (
      <NotFound message="Nothing Found || Error" />
    );
  }
};

export default HomePage;
