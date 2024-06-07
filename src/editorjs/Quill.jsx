import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { styles } from "../assets/styles/Basics";
import "../assets/styles/components/QullGlobal.scss";
import { forwardRef } from "react";
const Quill = forwardRef(function Quill ({ ReadOnly, content, onChange }, ref) {
  return (
    <>
      <ReactQuill
        theme={ReadOnly ? "bubble" : "snow"}
        // read
        readOnly={ReadOnly}
        placeholder={ReadOnly ? "" : ` Yozing...`}
        // write
        onChange={onChange}
        value={content}
        ref={ref}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
        }}
      />
      <style>{styles}</style>
    </>
  );
});

export default Quill;
