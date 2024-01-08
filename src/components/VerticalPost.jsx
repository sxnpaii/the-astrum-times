import moment from "moment";
import { Link } from "react-router-dom";
import sass from "../assets/styles/components/VerticalPost.module.scss";
import dateIcon from "../assets/images/calendar-line.svg";

const VerticalPost = ({ post }) => {
  return (
    <div className={sass.VerticalPost}>
      <Link to={`/events/${post.id}`} className={sass.ImgLink}>
        <img src={post.cover_img.url} alt={post.cover_img.name} />
      </Link>
      <div className={sass.Info}>
        <div className={sass.Event_Date}>
          <img src={dateIcon} className={sass.dateIcon} alt="calendar icon" />
          <p>{moment(post.event_time).format("h:mm, MMMM Do YYYY")}</p>
        </div>
        <h6 className={sass.Title}>{post.title}</h6>
        <p className={sass.Description}>{post.description}</p>
      </div>
    </div>
  );
};

export default VerticalPost;
