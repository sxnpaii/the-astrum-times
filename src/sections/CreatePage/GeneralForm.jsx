import sass from "../../assets/styles/sections/CreatePage/GeneralForm.module.scss"
import plus from "../../assets/images/plus-solid.svg"

const GeneralForm = ({
  handleOnChange,
  dataFromEditor,
  dataImage,
  handleFileUpload
}) => {


  return (
    <section className={sass.GeneralForm}>
      <label htmlFor="cover_img" className={sass.Cover_img}>
        <img
          className={sass.Img}
          src={dataImage.content ? dataImage.content : plus}
          alt=""
        />
        <p>{dataImage.name ? dataImage.name : "Upload a cover image. Image must be less than 3mb and in format horizontal format 16:9"}</p>
        <input
          className={sass.Cover_img_Input}
          type="file"
          name="cover_img"
          required
          placeholder='Cover_img'
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
      </label>
      <input
        className={`${sass.Input} ${sass.Title}`}
        type="text"
        name="title"
        placeholder='Title'
        required
        value={dataFromEditor.title}
        onChange={(e) => handleOnChange("title", e.target.value)}
      />
      <textarea
        className={`${sass.Input} ${sass.Description}`}
        type="text"
        name="description"
        placeholder='Description'
        required
        value={dataFromEditor.description}
        onChange={(e) => handleOnChange("description", e.target.value)}
      />
    </section>
  )
}

export default GeneralForm
