import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editortools";
import { styles } from "../assets/styles/Basics"
const Editorjs = ({
  ReadOnly,
  content,
  defaultValue,
  handleReady,
  handleInitialize,
  onChange
}) => {
  const Editor = createReactEditorJS()


  return (
    <>
      <Editor
        // basic
        holder="editorjs"
        minHeight={200}
        // read
        readOnly={ReadOnly}
        tools={EDITOR_JS_TOOLS}
        placeholder="Yozing..."
        // write 
        onChange={onChange}
        onReady={handleReady}
        onInitialize={handleInitialize}
        defaultValue={defaultValue ? defaultValue : content}
  
      />
      <style>
        {styles}
      </style>
    </>
  )
}

export default Editorjs
