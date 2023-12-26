import sass from "../../assets/styles/sections/HomePage/RightSide.module.scss"
import Events from "./RightSide/Events"

const RightSide = ({events}) => {
  return (
    <section className={sass.RightSide}>
      <Events events={events}/>
    </section>
  )
}

export default RightSide
