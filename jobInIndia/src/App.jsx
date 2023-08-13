import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Error,
  Landing,
  Admin,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  EditJob,
} from "./pages";
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { dashboardLoader } from "./pages/DashboardLayout";
import { addJobAction } from "./pages/AddJob";
import { allJobsLoader } from "./pages/AllJobs";
import { jobInfoAction, jobInfoLoader } from "./pages/EditJob";
import { deleteAction } from "./pages/DeleteJob";
import { adminLoader } from "./pages/Admin";
import { profileAction } from "./pages/Profile";
import { statsLoader } from "./pages/Stats";
const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") == "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};
const isDarkThemeEnabled = checkDefaultTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          { path: "stats", element: <Stats />, loader: statsLoader },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },

          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: jobInfoAction,
            loader: jobInfoLoader,
          },
          {
            path: "delete-job/:id",
            action: deleteAction,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
