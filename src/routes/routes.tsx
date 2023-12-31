import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Auth from "../pages/auth";
import NotFound from "../pages/NotFound";
import AllBooks from "../pages/AllBooks";
import PrivateRoute from "./PrivateRoute";
import AddNewBook from "../pages/AddNewBook";
import SingleBook from "../pages/SingleBook";
import EditBook from "../pages/EditBook";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
