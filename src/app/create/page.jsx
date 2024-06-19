"use client";
// react build-in hooks, components, functions
import { useState, useRef, useEffect } from "react";
// editorjs tools and components
import { PostData } from "../../firebase/Requests";
import {
  UploadImage,
  replaceBase64ImagesWithUrls,
} from "../../firebase/StorageQueries";
import Quill from "../../components/editorjs/Quill";
// components
import GeneralForm from "../../sections/CreatePage/GeneralForm";
// styles
import sass from "../../assets/styles/pages/Create.module.scss";
import Loading from "../../components/Loading";
import Dialog from "../../components/Dialog";
import { docxTOHtml, extractBase64Images } from "../../utils/fileReaders";

// Create page
const Create = () => {
  // state for loading screen
  const [isLoading, setIsLoading] = useState(false);

  // state for open dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //state for store published post from server
  const [dataFromServer, setDataFromServer] = useState();

  //  state for handle validation errors
  const [validationErrors, setValidationErrors] = useState({});
  // Getting draft data stored in localStorage
  const draft = JSON.parse(localStorage.getItem("draft"));
  // state for collecting draft
  localStorage.setItem(
    "draft",
    JSON.stringify({
      title: "",
      description: "",
      content: "",
      is_event: false,
      event_time: "",
      published_date: new Date().toISOString(),
      cover_img: {
        url: "",
        content: "",
        name: "",
      },
    })
  );
  const [dataFromEditor, setDataFromEditor] = useState({
    ...draft,
  });
  // effects
  useEffect(() => {
    // sync state and localStorage and collecting to one object
    localStorage.setItem(
      "draft",
      JSON.stringify({
        ...dataFromEditor,
      })
    );
  }, [dataFromEditor, draft]);

  // editor functions
  const editorCore = useRef();
  // set to state editorjs value and to localstorage
  const onChange = () => {
    if (editorCore !== null) {
      const raw = editorCore.current?.value;
      setDataFromEditor((prev) => ({ ...prev, content: raw }));
    }
  };

  // function for collecting title description and event time data
  const handleOnChange = (key, value) => {
    setDataFromEditor({
      ...dataFromEditor,
      [key]: value,
    });
  };

  // File uploading func to keep in browser
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    const innerFunc = () => {
      setDataFromEditor({
        ...dataFromEditor,
        cover_img: {
          name: file.name,
          content: reader.result,
        },
      });
    };
    reader.onload = innerFunc;
    reader.readAsDataURL(file);
  };

  // Saving data from localStorage to Server and clear draft
  const handleSave = async () => {
    try {
      const errors = {};

      // Check if required fields are filled
      if (!dataFromEditor.title) {
        errors.title = "Title is required";
      }
      if (!dataFromEditor.description) {
        errors.description = "Description is required";
      }
      if (!dataFromEditor.content) {
        errors.content = "Content is required";
      }
      if (!dataFromEditor.cover_img.content && !dataFromEditor.cover_img.name) {
        errors.cover_img = "Cover Image required";
      }
      if (Object.keys(errors).length > 0) {
        // Update validation errors state
        setValidationErrors(errors);
        return;
      }
      setValidationErrors({});
      // upload and send to db
      setIsLoading(true);
      // cover img
      const fromStorage = await UploadImage(dataFromEditor.cover_img);
      // propers
      const draft_raw = JSON.parse(localStorage.getItem("draft"));
      // convert images
      let base64Arr = extractBase64Images(dataFromEditor.content);
      const withUrlImages = await replaceBase64ImagesWithUrls(
        dataFromEditor.content,
        base64Arr
      );
      setDataFromServer(
        await PostData({
          ...draft_raw,
          content: withUrlImages.updatedHtmlString,
          imageRefs: withUrlImages.imageRefPaths,
          cover_img: {
            name: fromStorage.name,
            url: fromStorage.url,
          },
          published_date: new Date().toISOString(),
        })
      );
      // clearing draft
      localStorage.removeItem("draft");
      setIsLoading(false);
      setIsDialogOpen(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Clear draft data from localStorage and state
  const handleClearDraft = () => {
    // from localStorage
    localStorage.removeItem("draft");
    // from state
    setDataFromEditor({
      cover_img: {
        name: "",
        url: "",
      },
      title: "",
      description: "",
      content: "",
      is_event: false,
      event_time: "",
    });
  };

  const importDocx = async (file) => {
    const reader = new FileReader();
    try {
      const docxHtml = await docxTOHtml(file);
      setDataFromEditor((prev) => ({
        ...prev,
        content: docxHtml,
      }));
      reader.readAsArrayBuffer(file);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return isLoading ? (
    <Loading isLoading={isLoading} />
  ) : (
    <main className={sass.Create}>
      <div className={sass.Layer}>
        <GeneralForm
          dataFromEditor={dataFromEditor}
          actions={{ handleOnChange, handleFileUpload }}
          dataImage={dataFromEditor.cover_img}
          validationErrorsMessages={validationErrors}
        />
        <div className={sass.Content}>
          {validationErrors.content && (
            <p className={sass.Validator}>{validationErrors.content}</p>
          )}
          <Quill
            onChange={onChange}
            ref={editorCore}
            content={dataFromEditor.content}
          />
        </div>

        <div className={sass.ImportDocx}>
          <i>Alternatively, import post from a .DOCX file</i>
          <input
            type="file"
            className={sass.Input}
            onChange={(el) => importDocx(el.target.files[0])}
            accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>
        <div className={sass.Actions}>
          <button onClick={handleClearDraft} className={sass.Btn}>
            Clear Draft
          </button>
          <button
            onClick={() => setIsDialogOpen(true)}
            className={sass.ActiveBtn}
          >
            Save
          </button>
        </div>
      </div>
      {/*Dialog for fresh post link */}
      <Dialog
        states={{ isDialogOpen, setIsDialogOpen }}
        message={dataFromServer ? dataFromServer : false}
        funcs={!dataFromServer ? { Cancel: "", Ok: handleSave } : false}
        isInfo={dataFromServer}
      />
    </main>
  );
};

export default Create;