// sections
import Posts from "../sections/HomePage/Posts";
import RightSide from "../sections/HomePage/RightSide";
// styles
import sass from "../assets/styles/pages/HomePage.module.scss";
import { cache } from "react";

const fetchData = cache(async () => {
  try {
    const response = await fetch(`${process.env.URL}api/getposts`);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
});
const HomePage = async () => {
  const getData = await fetchData();

  return (
    getData.length !== 0 && (
      <main className={sass.HomePageLayer}>
        {/* sections */}
        <Posts getData={getData.filter((el) => !el.is_event)} />
        <RightSide events={getData.filter((el) => el.is_event)} />
      </main>
    )
  );
};

export default HomePage;
