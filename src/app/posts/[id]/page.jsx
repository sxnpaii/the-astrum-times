import moment from "moment";
import { GetOneData } from "../../../firebase/Requests";
import Editorjs from "../../../editorjs/Quill";
import { styles } from "../../../assets/styles/Basics";
import sass from "../../../assets/styles/pages/Post.module.scss";

const PostPage = async ({ params: { id } }) => {
  const getOneRec = await GetOneData(id);
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
            {moment(getOneRec.published_date).format("MMMM Do YYYY, h:mm:ss a")}
          </b>
        </p>
        <img
          className={sass.Cover_Img}
          src={getOneRec.cover_img.url}
          alt={getOneRec.title}
        />
      </div>

      <Editorjs content={getOneRec.content} ReadOnly className={sass.Content} />
      <style>{styles}</style>
    </main>
  );
};

export default PostPage;
