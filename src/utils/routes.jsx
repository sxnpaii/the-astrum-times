import HomePage from "@/app";
import PostPage from "@/app/post";
import Create from "@/app/create";

const CreatePageUrl = import.meta.env.VITE_CREATEPAGE_Url;

export const routes = [
  { path: "/", element: <HomePage />, index: true },
  { path: `/${CreatePageUrl}`, element: <Create /> },
  { path: "/posts/:id", element: <PostPage /> },
  { path: "/events/:id", element: <PostPage /> },
];
