import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "*",
        element: <NotFoundErrorPage></NotFoundErrorPage>,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router}></RouterProvider>;
}
