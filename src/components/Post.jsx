import moment from "moment";
import Link from "next/link";
import dateIcon from "@/assets/images/calendar-line.svg";
import sass from "@/assets/styles/components/Post.module.scss";
import Image from "next/image";

const Post = ({ postData, isMiniPost, isEvent }) => {
  return (
    <div className={isMiniPost ? sass.Mini_Post : sass.Post}>
      <div className={sass.Info}>
        {isEvent && (
          <div className={sass.Event_Date}>
            <Image
              src={dateIcon.src}
              alt="Calendar icon"
              className={sass.dateIcon}
              width={23}
              height={23}
            />
            <p>{moment(postData.event_time).format("h:mm a, MMMM Do YYYY")}</p>
          </div>
        )}
        <Link href={`/posts/${postData.id}`} className={sass.Title}>
          {postData.title}
        </Link>
        <p className={sass.Description}>{postData.description}</p>
        <p className={sass.Published_Date}>
          {moment(postData.published_date).fromNow()}
        </p>
      </div>
      <Link href={`/posts/${postData.id}`} className={sass.Link}>
        <Image
          src={postData.cover_img.url}
          alt={postData.title}
          className={sass.Cover_img}
          width={370}
          height={250}
          priority
        />
      </Link>
    </div>
  );
};

export default Post;
