"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import sass from "../../../assets/styles/sections/HomePage/RightSide/Events.module.scss";
import VerticalPost from "../../../components/VerticalPost";
import Post from "../../../components/Post";
import NotFound from "../../../components/NotFound";
const Events = ({ events }) => {
  const TODAY = Date.now();
  return (
    <section className={sass.Events}>
      <section className={`${sass.UpcomingEvents}`}>
        <h4 className={sass.Heading}>Upcoming Events</h4>
        <Swiper
          className={`mySwiper`}
          spaceBetween={30}
          slidesPerView={1}
          slidesPerGroup={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 1,
            },
          }}
          pagination={true}
          autoHeight={true}
          loop={true}
          autoplay={{
            disableOnInteraction: false,
            delay: 2700,
          }}
          modules={[Pagination, Autoplay]}
        >
          {/* filter data */}
          {events.length ? (
            events
              .filter((el) => new Date(el.event_time).getTime() > TODAY)
              .map((event) => (
                <SwiperSlide key={event.id}>
                  <VerticalPost post={event} />
                </SwiperSlide>
              ))
          ) : (
            <NotFound message={"Events not Found"}/>
          )}
        </Swiper>
      </section>
      {/* filter data */}
      <hr className="my-5" />
      <section className={sass.PastEvents}>
        <h4 className={sass.Heading}>Past Events</h4>
        {events.length ? (
          events
            .filter((el) => new Date(el.event_time).getTime() < TODAY)
            .map((el) => (
              <Post
                key={el.id}
                postData={el}
                isMiniPost={true}
                isEvent={true}
              />
            ))
        ) : (
          <NotFound message={"Events not Found"}/>
          )}
      </section>
    </section>
  );
};

export default Events;
