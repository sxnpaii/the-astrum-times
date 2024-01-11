import sass from "../../assets/styles/sections/CreatePage/GeneralForm.module.scss";
import plus from "../../assets/images/plus-solid.svg";

const GeneralForm = ({
  dataFromEditor,
  actions: { handleOnChange, handleFileUpload },
  dataImage,
  validationErrorsMessages,
}) => {
  return (
    <section className={sass.GeneralForm}>
      <label htmlFor="cover_img" className={sass.Cover_img}>
        <img
          className={sass.Img}
          src={dataImage.content ? dataImage.content : plus}
          alt="draft image"
        />
        <p>
          {dataImage.name
            ? dataImage.name
            : "Upload a cover image. Image must be less than 3mb and in format horizontal format 16:9"}
        </p>
        <input
          className={sass.Cover_img_Input}
          type="file"
          name="cover_img"
          required
          placeholder="Cover_img"
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
        {validationErrorsMessages.cover_img && (
          <p className={sass.Validator}>{validationErrorsMessages.cover_img}</p>
        )}
      </label>
      <input
        className={`${sass.Input} ${sass.Title}`}
        type="text"
        name="title"
        placeholder="Title"
        required
        value={dataFromEditor.title}
        onChange={(e) => handleOnChange("title", e.target.value)}
      />
      {validationErrorsMessages.title && (
        <p className={sass.Validator}>{validationErrorsMessages.title}</p>
      )}
      <textarea
        className={`${sass.Input} ${sass.Description}`}
        type="text"
        name="description"
        placeholder="Description"
        required
        value={dataFromEditor.description}
        onChange={(e) => handleOnChange("description", e.target.value)}
      />
      {validationErrorsMessages.description && (
        <p className={sass.Validator}>{validationErrorsMessages.description}</p>
      )}
      <div className={sass.Is_Event}>
        <p>
          Этот пост объявление какого-то ивента ?<br />
          <sup>
            <i>Если да, поставьте checked и укажите дату ивента</i>
          </sup>
        </p>

        <div className={sass.Question}>
          {dataFromEditor.is_event && (
            <input
              type="datetime-local"
              className={sass.Event_Time}
              value={dataFromEditor.event_time}
              onChange={(e) => handleOnChange("event_time", e.target.value)}
            />
          )}
          <input
            className={`${sass.Is_EventCheckbox}`}
            type="checkbox"
            name="is_event"
            id="is_event"
            checked={dataFromEditor.is_event}
            onChange={(e) => handleOnChange("is_event", e.target.checked)}
          />
        </div>
      </div>
    </section>
  );
};

export default GeneralForm;
