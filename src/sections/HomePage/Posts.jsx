
import Post from "../../components/Post";
// styles
import sass from "../../assets/styles/sections/HomePage/Posts.module.scss";
import { sortData } from "../../utils/helpers";
import NotFound from "../../components/NotFound";

const Posts = ({ getData }) => {
  if (!getData.length) {
    return (
      <NotFound message={"Posts not Found"}/>
    );
  } else {
    return (
      <section className={sass.Posts}>
        {sortData(getData, "byDate >").map((post) => (
          <Post postData={post} key={post.id} />
        ))}
      </section>
    );
  }
};

export default Posts;
