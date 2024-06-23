import { db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
export const dynamic = "force-dynamic";
const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const docSnap = await getDoc(doc(db, "Posts", id));
    if (docSnap.exists()) {
      return Response.json({
        ...docSnap.data(),
      });
    } else {
      return new Response({ error: "No such document!" }, { status: 404 });
    }
  } catch (err) {
    return new Response({ GetOnePostError: err.message }, { status: 500 });
  }
};

export { GET };
