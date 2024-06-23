import moment from "moment";
import dynamicImport from "next/dynamic";
const Quill = dynamicImport(
  () => import("../../../components/editorjs/Quill"),
  { ssr: false }
);
import { styles } from "../../../assets/styles/Basics";
import sass from "../../../assets/styles/pages/Post.module.scss";

const PostPage = async ({ params: { id = "" } }) => {
  const response = await fetch(`${process.env.URL}/api/getonepost?id=${id}`);
  const getOneRec = await response.json();
  // return getOneRec;
  return (
    getOneRec && (
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
        <section className={sass.Content}>
          <Quill content={getOneRec.content} ReadOnly />
        </section>
        <style>{styles}</style>
      </main>
    )
  );
};

export default PostPage;
