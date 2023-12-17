import sass from "../assets/styles/components/Loading.module.scss"

const Loading = ({ status }) => {

  if (!status) {
    return (
      <>
        <p className={sass.Loading}>Loading...</p>
      </>
    )
  }
  else null
}

export default Loading
