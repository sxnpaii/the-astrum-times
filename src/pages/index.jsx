import { useEffect, useState } from "react";
import { GetAllData } from "../firebase/Requests"
// sections
import Layout from "../layouts/Layout";
import Posts from "../sections/HomePage/Posts";
import RightSide from '../sections/HomePage/RightSide'
import Loading from "../components/Loading";

// styles
import sass from "../assets/styles/pages/HomePage.module.scss"

const HomePage = () => {
  const [getData, setGettingData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setGettingData(await GetAllData());
        setIsLoading(false)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchData();
    // console.log(getData)
  }, [])

  return (
    isLoading
      ?
      <Loading />
      :
      <Layout className={sass.HomePageLayer}>
        {/* sections */}
        <Posts getData={getData} />

        <RightSide events={getData.filter((el) => el.is_event)} />
      </Layout>
  )
}

export default HomePage;