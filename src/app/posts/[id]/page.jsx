import moment from "moment";
import dynamicImport from "next/dynamic";
const Quill = dynamicImport(() => import("@/components/editorjs/Quill"), {
  ssr: false,
});
import { styles } from "@/assets/styles/Basics";
import sass from "@/assets/styles/pages/Post.module.scss";
import { cookies } from "next/headers";
import Link from "next/link";
import NotFound from "@/components/NotFound";
const fetchData = async (id) => {
  "use server";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/getonepost?id=${id}`,
      { cache: "no-store" }
    );
    const getOneRec = await response.json();
    return getOneRec;
  } catch (err) {}
};

const PostPage = async ({ params: { id } }) => {
  const getOneRec = await fetchData(id);
  const adm = cookies().get("authToken");
  return getOneRec ? (
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
      <section className={sass.Content}>
        {Quill && <Quill content={getOneRec.content} ReadOnly />}
      </section>
      <style>{styles}</style>
      {adm?.value && (
        <div className="edit fixed bottom-5 right-5 flex gap-3">
          <Link
            href={`${id}/edit`}
            className={`block text-BasicTextColor dark:text-ReadableBgColor text-2xl py-3 px-5 border rounded-2xl hover:bg-BasicTextColor hover:text-ReadableBgColor`}
          >
            Edit
          </Link>
        </div>
      )}
    </main>
  ) : (
    <NotFound message="Post not found" />
  );
};

export default PostPage;
