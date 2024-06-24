// sections
import Posts from "../sections/HomePage/Posts";
import RightSide from "../sections/HomePage/RightSide";
// styles
import sass from "../assets/styles/pages/HomePage.module.scss";

const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.URL}/api/getposts`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err);
  }
};

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const getData = await fetchData();
  return (
    getData.length !== 0 && (
      <main className={sass.HomePageLayer}>
        {/* sections */}
        <Posts getData={getData.filter((el) => !el?.is_event)} />
        <RightSide events={getData.filter((el) => el?.is_event === true)} />
      </main>
    )
  );
};

export default HomePage;
