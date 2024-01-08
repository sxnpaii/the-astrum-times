import { createBrowserRouter, RouterProvider } from "react-router-dom";
// pages
import HomePage from "./pages";
import PostPage from "./pages/post";
import { ImportFonts } from "./assets/styles/Basics";
import Create from "./pages/create";

// routes
const router = createBrowserRouter([
  { path: "/", element: <HomePage />, index: true },
  { path: "/create", element: <Create /> },
  { path: "/posts/:id", element: <PostPage /> },
]);

function App() {
  return (
    <main className="App">
      {/* Routes */}
      <RouterProvider router={router} />
      <style>{ImportFonts}</style>
    </main>
  );
}

export default App;
