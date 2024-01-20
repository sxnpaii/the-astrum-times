import HomePage from "../pages";
import PostPage from "../pages/post";
import Create from "../pages/create";

const CreatePageUrl = import.meta.env.VITE_CREATEPAGE_URL;

export const routes = [
  { path: "/", element: <HomePage />, index: true },
  { path: `/${CreatePageUrl}`, element: <Create /> },
  { path: "/posts/:id", element: <PostPage /> },
  { path: "/events/:id", element: <PostPage /> },
];
