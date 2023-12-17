import { Link } from "react-router-dom";
import sass from "../assets/styles/components/Post.module.scss";

const Post = ({ postData }) => {
  console.log(postData.published_date);
  return (
    <div className={sass.Post}>
      <div className={sass.Info}>
        <h6 className={sass.Title}>{postData.title}</h6>
        <p className={sass.Description}>{postData.description}</p>
        {/* <p>{postData.published_date}</p> */}
      </div>
      <Link to={`/posts/${postData.id}`} className={sass.Link}>
        <img src={postData.cover_img} alt={postData.title} className={sass.Cover_img} /> 
      </Link>
    </div>
  )
}

export default Post
