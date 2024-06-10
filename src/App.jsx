import { createBrowserRouter, RouterProvider } from "react-router-dom";
// routes
import { ImportFonts } from "./assets/styles/Basics";
import Layout from "./layouts/Layout";
import { routes } from "./utils/routes";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: routes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
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
