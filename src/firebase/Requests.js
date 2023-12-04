import { collection, getDoc, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"

// GET ALL DATA 
export const GetAllData = async () => {
  const temp = []
  try {
    const querySnap = await getDocs(collection(db, "Posts"))
     querySnap.forEach((doc) => {
      temp.push(doc.data())
    })
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
  return temp;
}