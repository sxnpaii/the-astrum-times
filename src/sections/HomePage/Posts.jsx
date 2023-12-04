import { useEffect, useState } from "react"
import { GetAllData } from "../../firebase/Requests"

const Posts = () => {
  const [getData, setGettingData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setGettingData(await GetAllData());
    }
    fetchData();
  }, [])

  
  return (
    <section className="Posts">
      {getData ? console.log(getData) : <h1>Error!</h1>}
    </section>
  )
}

export default Posts