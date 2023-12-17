// tools.js
import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
// additional features
import TelegramPost from 'editorjs-telegram-post'
import DragDrop from "editorjs-drag-drop";
import Undo from 'editorjs-undo';
// export additional features
export { DragDrop, Undo }

export const EDITOR_JS_TOOLS = {
  header: Header,
  list: List,
  embed: Embed,
  code: Code,
  checklist: CheckList,
  quote: Quote,
  marker: Marker,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  telegramPost: TelegramPost,
}