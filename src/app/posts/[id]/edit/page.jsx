"use client";
// react build-in hooks, components, functions
import { useState, useRef, useEffect } from "react";
// editorjs tools and components
import {
  UploadImage,
  replaceBase64ImagesWithUrls,
} from "@/firebase/StorageQueries";
import { DeleteData, UpdateData } from "@/firebase/Requests";
import dynamicImport from "next/dynamic";
const Quill = dynamicImport(() => import("@/components/editorjs/Quill"), {
  ssr: false,
});
// components
import GeneralForm from "@/sections/CreatePage/GeneralForm";
// styles
import sass from "@/assets/styles/pages/Create.module.scss";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import Dialog from "@/components/Dialog";
import { docxTOHtml, extractBase64Images } from "@/utils/fileReaders";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useCookies } from "react-cookie";

export const dynamic = "force-dynamic";
// Create page
const EditPost = ({ params: { id } }) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["authToken"]);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cook = await cookies.authToken;
        const userToken = await user.getIdToken();
        if (userToken !== cook) {
          router.push("/auth/signin");
        }
      } else {
        router.push("/auth/signin");
      }
    });
  }, [cookies.authToken, router]);
  // state for loading screen
  const [isLoading, setIsLoading] = useState(false);

  // state for open dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //state for store published post from server
  const [dataFromServer, setDataFromServer] = useState();

  //  state for handle validation errors
  const [validationErrors, setValidationErrors] = useState({});
  const [dataFromEditor, setDataFromEditor] = useState({
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
  });
  // get data for editing
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/getonepost?id=${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setDataFromEditor({
            ...(await data),
            cover_img: {
              ...(await data.cover_img),
              content: await data.cover_img.url,
            },
          });
          setIsLoading(false);
        }
        setIsLoading(false);
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, [id]);
  // editor functions
  const editorCore = useRef(null);
  // set to state editorjs value and to localstorage
  const onChange = () => {
    if (editorCore.current !== null) {
      const raw = editorCore.current.value;
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
      if (!dataFromEditor.event_time && dataFromEditor.is_event) {
        errors.event_time = "Event Time is required";
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
      // convert images
      let base64Arr = await extractBase64Images(dataFromEditor.content);
      const withUrlImages = await replaceBase64ImagesWithUrls(
        dataFromEditor.content,
        base64Arr
      );
      setDataFromServer(
        await UpdateData(id, {
          ...dataFromEditor,
          content: withUrlImages.updatedHtmlString,
          imageRefs: withUrlImages.imageRefPaths,
          cover_img: {
            name: fromStorage.name
              ? fromStorage.name
              : dataFromEditor.cover_img.name,
            url: fromStorage.url
              ? fromStorage.url
              : dataFromEditor.cover_img.url,
          },
          published_date: new Date().toISOString(),
        })
      );
      setIsLoading(false);
      setIsDialogOpen(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await DeleteData(id);
      setIsLoading(false);
      router.refresh();
    } catch (err) {
      throw new Error(err);
    }
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

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  } else if (!dataFromEditor.title) {
    return <NotFound message={"Nothing found to edit"} />;
  } else {
    return (
      <main className={sass.Create}>
        <div className={sass.Layer}>
          <GeneralForm
            dataFromEditor={dataFromEditor}
            actions={{ handleOnChange, handleFileUpload }}
            dataImage={dataFromEditor.cover_img}
            validationErrorsMessages={validationErrors}
          />
          <div className={sass.Content}>
            <Quill
              onChange={onChange}
              reffer={editorCore}
              content={dataFromEditor.content}
            />
            {validationErrors.content && (
              <p className={sass.Validator}>{validationErrors.content}</p>
            )}
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
            <button
              onClick={handleDelete}
              className={`${sass.Btn} text-[#9b2b2b]`}
            >
              Delete
            </button>
            <button
              onClick={() => setIsDialogOpen(true)}
              className={sass.ActiveBtn}
            >
              Update
            </button>
          </div>
        </div>
        {/* Dialog for fresh post link */}
        <Dialog
          states={{ isDialogOpen, setIsDialogOpen }}
          message={dataFromServer ? dataFromServer : false}
          funcs={!dataFromServer ? { Cancel: "", Ok: handleSave } : false}
          isInfo={dataFromServer}
        />
      </main>
    );
  }
};

export default EditPost;
