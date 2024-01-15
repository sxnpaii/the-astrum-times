// react build-in hooks, components, functions
import { useState, useCallback, useRef, useEffect } from "react";
// editorjs tools and components
import { DragDrop, Undo } from "../editorjs/editortools";
import { PostData } from "../firebase/Requests";
import { UploadImage } from "../firebase/StorageQueries";
import Editorjs from "../editorjs/Editorjs";
// components
import Layout from "../layouts/Layout";
import GeneralForm from "../sections/CreatePage/GeneralForm";
// styles
import sass from "../assets/styles/pages/Create.module.scss";
import Loading from "../components/Loading";
import Dialog from "../components/Dialog";

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

  // set default data for first time usage to localStorage
  localStorage.setItem(
    "draft",
    JSON.stringify({
      cover_img: {
        name: "",
        url: "",
        content: "",
      },
      title: "",
      description: "",
      content: "",
      is_event: false,
      event_time: "",
      // published_date: new Date()
    })
  );

  // state for collecting draft
  const [dataFromEditor, setDataFromEditor] = useState({
    ...draft,
  });

  // EditorJs value state
  const [editorjsValue, setEditorjsValue] = useState(draft.content || "");

  // effects
  useEffect(() => {
    // confirmation if user need reload
    window.onbeforeunload = () => "Are you sure !?";
    // sync state and localStorage and collecting to one object
    localStorage.setItem(
      "draft",
      JSON.stringify({
        ...dataFromEditor,
        content: editorjsValue,
      })
    );
  }, [editorjsValue, dataFromEditor, draft]);

  // editor functions
  const editorCore = useRef();
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  // set Undo Redo plugins on ready
  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    new Undo({ editor });
    new DragDrop(editor);
  };

  // set to state editorjs value and to localstorage
  const onChange = async () => {
    const raw = await editorCore.current.save();
    setEditorjsValue(raw);
  };

  // function for collecting title description and event time data
  const handleOnChange = useCallback(
    (key, value) => {
      setDataFromEditor({
        ...dataFromEditor,
        [key]: value,
      });
    },
    [dataFromEditor]
  );

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
      if (!dataFromEditor.content.blocks) {
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
      const fromStorage = await UploadImage(dataFromEditor.cover_img);
      const draft_raw = JSON.parse(localStorage.getItem("draft"));
      setDataFromServer(
        await PostData({
          ...draft_raw,
          cover_img: {
            name: fromStorage.name,
            url: fromStorage.url,
          },
          published_date: new Date(Date.now()).toISOString(),
        })
      );
      localStorage.removeItem("draft");
      setIsLoading(false);
      setIsDialogOpen(true);
    } catch (error) {
      console.error(error);
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
      content: {},
      is_event: false,
      event_time: "",
    });
    // from Editor
    setEditorjsValue({});
    window.location.reload();
  };

  return isLoading ? (
    <Loading isLoading={isLoading} />
  ) : (
    <Layout className={sass.Create}>
      <div className={sass.Layer}>
        <GeneralForm
          dataFromEditor={dataFromEditor}
          actions={{ handleOnChange, handleFileUpload }}
          dataImage={dataFromEditor.cover_img}
          validationErrorsMessages={validationErrors}
        />

        <div className={sass.Content}>
          <i>Редактор всё ещё в тестовом режиме... </i>
          {validationErrors.content && (
            <p className={sass.Validator}>{validationErrors.content}</p>
          )}
          <Editorjs
            onChange={onChange}
            handleInitialize={handleInitialize}
            handleReady={handleReady}
            onref={editorCore}
            content={dataFromEditor.content}
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
    </Layout>
  );
};

export default Create;
