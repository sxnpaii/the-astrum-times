
import Layout from "../layouts/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetOneData } from "../firebase/Requests";
import Editorjs from "../editorjs/Editorjs";

import { styles } from "../assets/styles/Basics";
import sass from "../assets/styles/pages/Post.module.scss";
import Loading from "../components/Loading";
import moment from "moment";

const PostPage = () => {
  const { id } = useParams()
  const [getOneRec, setGettingOneRec] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        setGettingOneRec(await GetOneData(id))
      }
      catch (err) {
        console.error(err)
      }
    }
    getData()
  }, []);

  if (getOneRec) {
    return (
      <Layout className={sass.PostPage}>
        <h1 className={sass.Title}>{getOneRec.title}</h1>
        <h6 className={sass.Description}>{getOneRec.description}</h6>
        <p className={sass.Published_Date}>{moment(getOneRec.published_date).format("MMMM Do YYYY, h:mm:ss a")}</p>
        <img className={sass.Cover_Img} src={getOneRec.cover_img.url} alt={getOneRec.title} />
        <Editorjs content={getOneRec.content} ReadOnly />
        <style>{styles}</style>
      </Layout>
    )
  }
  else {
    return <Loading status={getOneRec} />
  }
}

export default PostPage
