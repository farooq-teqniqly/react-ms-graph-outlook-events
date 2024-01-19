import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
import HomePageContainer from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: (
          <HomePageContainer url="https://graph.microsoft.com/v1.0/me/events?$filter=type eq 'seriesMaster'&select=id,recurrence,subject&top=1000"></HomePageContainer>
        ),
      },
      {
        path: "*",
        element: <NotFoundErrorPage></NotFoundErrorPage>,
      },
    ],
  },
]);

export default function Routes() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}
