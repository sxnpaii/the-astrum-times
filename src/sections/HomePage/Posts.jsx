import { useEffect, useState } from "react";

import Post from "../../components/Post";
// styles
import sass from "../../assets/styles/sections/HomePage/Posts.module.scss";
import { sortData } from "../../utils/helpers";

const Posts = ({ getData }) => {
  if (!getData.length) {
    return (
      <section className={sass.Posts} >
        <h1>Error</h1>
      </section>
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
