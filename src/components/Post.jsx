import moment from "moment";
import { Link } from "react-router-dom";
import dateIcon from "../assets/images/calendar-line.svg";
import sass from "../assets/styles/components/Post.module.scss";

const Post = ({ postData, isMiniPost, isEvent }) => {
  return (
    <div className={isMiniPost ? sass.Mini_Post : sass.Post}>
      <div className={sass.Info}>
        {isEvent ? (
          <div className={sass.Event_Date}>
            <img src={dateIcon} alt="Calendar icon" className={sass.dateIcon} />
            <p>{moment(postData.event_time).format("h:mm a, MMMM Do YYYY")}</p>
          </div>
        ) : null}
        <Link
          to={`/${isEvent ? "events" : "posts"}/${postData.id}`}
          className={sass.Title}
        >
          {postData.title}
        </Link>
        <p className={sass.Description}>{postData.description}</p>
        <p className={sass.Published_Date}>
          {moment(postData.published_date).fromNow()}
        </p>
      </div>
      <Link
        to={`/${isEvent ? "events" : "posts"}/${postData.id}`}
        className={sass.Link}
      >
        <img
          src={postData.cover_img.url}
          alt={postData.title}
          className={sass.Cover_img}
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export default Post;
