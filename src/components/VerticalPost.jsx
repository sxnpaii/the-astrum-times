import moment from "moment";
import Link from "next/link";
import sass from "../assets/styles/components/VerticalPost.module.scss";
import dateIcon from "../assets/images/calendar-line.svg";
import Image from "next/image";

const VerticalPost = ({ post }) => {
  return (
    <div className={sass.VerticalPost}>
      <Link href={`/posts/${post.id}`} className={sass.ImgLink}>
        <Image
          src={post.cover_img.url}
          alt={post.title}
          className={sass.Img}
          width={500}
          height={300}
        />
      </Link>
      <div className={sass.Info}>
        <div className={sass.Event_Date}>
          <Image
            src={dateIcon.src}
            className={sass.dateIcon}
            alt="calendar icon"
            width={0}
            height={0}
          />
          <p>{moment(post.event_time).format("h:mm a, MMMM Do YYYY")}</p>
        </div>
        <h6 className={sass.Title}>{post.title}</h6>
        <p className={sass.Description}>{post.description}</p>
      </div>
    </div>
  );
};

export default VerticalPost;
