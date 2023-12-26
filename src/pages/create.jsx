// react build-in hooks, components, functions
import { useState, useCallback, useRef, useEffect } from 'react'
// editorjs tools and components
import { DragDrop, Undo } from "../editorjs/editortools";
import { PostData } from '../firebase/Requests';
import { UploadImage } from '../firebase/StorageQueries';
import Editorjs from '../editorjs/Editorjs'
// components
import Layout from '../layouts/Layout'
import GeneralForm from '../sections/CreatePage/GeneralForm';
// styles
import sass from "../assets/styles/pages/Create.module.scss"
import Loading from '../components/Loading';

// Create page 
const Create = () => {
  // Getting draft data stored in localStorage
  const draft = JSON.parse(localStorage.getItem("draft"));
  // set default data for first time usage to localStorage
  localStorage.setItem("draft", JSON.stringify({
    cover_img: {
      name: "",
      url: "",
    },
    title: "",
    description: "",
    content: "",
    is_event: false,
    event_time: "",
    // published_date: new Date()
  }))
  // state for loading screen 
  const [isLoading, setIsLoading] = useState(false)
  // state for collecting draft
  const [dataFromEditor, setDataFromEditor] = useState({
    ...draft
  })
  // EditorJs value state 
  const [editorjsValue, setEditorjsValue] = useState(draft.content)
  // effects
  useEffect(() => {
    // confirmation if user need reload 
    window.onbeforeunload = () => confirm;
    // sync state and localStorage and collecting to one object 
    localStorage.setItem('draft', JSON.stringify({
      ...dataFromEditor, content: editorjsValue
    }))
  }, [editorjsValue, dataFromEditor, draft])

  // editor functions 
  const editorCore = useRef()
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])
  // set Undo Redo plugins on ready
  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    new Undo({ editor })
    new DragDrop(editor);
  };
  // set to state editorjs value and to localstorage
  const onChange = async () => {
    const raw = await editorCore.current.save();
    setEditorjsValue(raw);

  };
  // function for collecting title description and event time data
  const handleOnChange = useCallback((key, value) => {
    setDataFromEditor({
      ...dataFromEditor,
      [key]: value
    });
  }, [dataFromEditor]);
  // File uploading func to keep in browser
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    const innerFunc = () => {
      setDataFromEditor({
        ...dataFromEditor,
        cover_img: {
          name: file.name,
          content: reader.result
        }
      })
    }
    reader.onload = innerFunc;
    reader.readAsDataURL(file)
  }

  // Saving data from localStorage to Server and clear draft
  const handleSave = async () => {
    try {
      setIsLoading(true)
      const draft_raw = JSON.parse(localStorage.getItem("draft"));
      const fromStorage = await UploadImage(dataFromEditor.cover_img);
      await PostData({
        ...draft_raw,
        cover_img: {
          name: fromStorage.name,
          url: fromStorage.url
        },
        published_date: new Date(Date.now()).toISOString()
      });
      localStorage.removeItem("draft");
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    isLoading
      ?
      <Loading />
      :
      <Layout className={sass.Create}>
        <div className={sass.Layer}>

          <GeneralForm
            dataFromEditor={dataFromEditor}
            handleOnChange={handleOnChange}
            handleSave={handleSave}
            handleFileUpload={handleFileUpload}
            dataImage={dataFromEditor.cover_img}
          />
          <div className={sass.Is_Event}>
            <p> Этот пост объявление какого-то ивента ?<br />
              <sup>
                <i>
                  Если да, поставьте checked и укажите дату ивента
                </i>
              </sup>
            </p>

            <div className={sass.Question}>
              <input
                className={`${sass.Is_EventCheckbox}`}
                type="checkbox"
                name="is_event"
                id="is_event"
                checked={dataFromEditor.is_event}
                onChange={(e) => handleOnChange("is_event", e.target.checked)}
              />
              {
                dataFromEditor.is_event
                  ?
                  <input
                    type="datetime-local"
                    className={sass.Event_Time}
                    value={dataFromEditor.event_time}
                    onChange={(e) => handleOnChange("event_time", e.target.value)}
                  />
                  :
                  null
              }
            </div>
          </div>
          <div className={sass.Content}>
            <Editorjs
              onChange={onChange}
              handleInitialize={handleInitialize}
              handleReady={handleReady}
              onref={editorCore}
              defaultValue={dataFromEditor.content}
            />
            <button
              onClick={handleSave}
              className={sass.Btn}
            >
              Save
            </button>
          </div>
        </div>
      </Layout>
  )
}

export default Create