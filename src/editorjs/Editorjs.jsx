import { createReactEditorJS } from "react-editor-js";
import { content } from "../utils/localdata";
import { EDITOR_JS_TOOLS, DragDrop, Undo } from "./editortools";

import { useCallback, useRef } from "react";



const Editorjs = ({ saveData }) => {
  const Editor = createReactEditorJS()
  const editorCore = useRef()
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    new Undo({ editor })
    new DragDrop(editor);
  };

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();
    saveData(savedData)
    console.log(savedData)

  }, [saveData]);

  return (
    <div>
      <Editor
        onReady={handleReady}
        onInitialize={handleInitialize}
        holder="editorjs"
        minHeight={0}
        tools={EDITOR_JS_TOOLS}
        defaultValue={{
          "time": new Date().getTime(),
          ...content
        }} />

      <button
        onClick={handleSave}
        className="bg-black p-3 text-white">Save</button>
    </div>
  )
}

export default Editorjs
