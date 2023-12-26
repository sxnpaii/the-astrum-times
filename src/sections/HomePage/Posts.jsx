import { useEffect, useState } from "react"

import Post from "../../components/Post"
// styles
import sass from '../../assets/styles/sections/HomePage/Posts.module.scss';
import { sortData } from "../../utils/helpers";

const Posts = ({ getData }) => {

  return (
    <section className={sass.Posts}>
      {
        getData
          ?
          sortData(getData, "byDate >")
            .map((post) => !post.is_event && <Post postData={post} key={post.id} />)
          :
          <h1>Error!</h1>
      }
    </section>
  )
}

export default Posts