import Editorjs from '../Editorjs/Editorjs'
import Output from 'editorjs-react-renderer'


import { useState } from 'react'
const Dashboard = () => {
 const [dataFromEditor, setDataFromEditor] = useState()

  const saveData = (dataObj) => {
    setDataFromEditor(dataObj)
  }
  return (
    <main className='Dashboard'>
      <Editorjs saveData={saveData} />
      <Output data={dataFromEditor} />
    </main>
  )
}

export default Dashboard