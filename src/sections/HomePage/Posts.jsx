import { useEffect, useState } from "react"
import { GetAllData } from "../../firebase/Requests"
import Post from "../../components/Post"
// styles
import sass from '../../assets/styles/sections/HomePage/Posts.module.scss';

const Posts = () => {
  const [getData, setGettingData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setGettingData(await GetAllData());
    }
    fetchData();
    console.log(getData)
  }, [])
  
  return (
    <section className={sass.Posts}>
      {
        getData
          ?
          getData.map((post) => <Post postData={post} key={post.id} />)
          :
          <h1>Error!</h1>
      }
    </section>
  )
}

export default Posts