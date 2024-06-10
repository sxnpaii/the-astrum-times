import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetOneData } from "../firebase/Requests";
import Editorjs from "../editorjs/Quill";

import { styles } from "../assets/styles/Basics";
import sass from "../assets/styles/pages/Post.module.scss";
import Loading from "../components/Loading";
import moment from "moment";

const PostPage = () => {
  const { id } = useParams();
  const [getOneRec, setGettingOneRec] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setGettingOneRec(await GetOneData(id));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [id]);

  if (getOneRec) {
    return (
      <main className={sass.PostPage}>
        <div className={sass.MetaInfo}>
          {getOneRec.is_event && (
            <b className={sass.Event_Time}>
              Event time:{" "}
              {moment(getOneRec.event_time).format("MMMM Do YYYY, h:mm:ss a")}
            </b>
          )}
          <h2 className={`${sass.Title} title`}>{getOneRec.title}</h2>
          <h4 className={`${sass.Description} description`}>
            {getOneRec.description}
          </h4>
          <p className={sass.Published_Date}>
            Published at:{" "}
            <b>
              {moment(getOneRec.published_date).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </b>
          </p>
          <img
            className={sass.Cover_Img}
            src={getOneRec.cover_img.url}
            alt={getOneRec.title}
          />
        </div>

        <Editorjs
          content={getOneRec.content}
          ReadOnly
          className={sass.Content}
        />
        <style>{styles}</style>
      </main>
    );
  } else {
    return isLoading ? <Loading isLoading={isLoading} /> : <h1>Error</h1>;
  }
};

export default PostPage;
