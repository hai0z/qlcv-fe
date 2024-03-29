import { Outlet, createBrowserRouter } from "react-router-dom";
import Nav from "../components/navbar";
import HomePage from "../pages/homePage";
import AuthProvider from "../context/authProvider";
import Login from "../pages/login";
import CalenderPage from "../pages/calender/calenderPage";
import WorkInfoPage from "../pages/works/work-info/workInfoPage";
import { Toaster } from "react-hot-toast";
import AddWorkPage from "../pages/works/work-add/addWorkPage";

const RootLayout = () => {
  return (
    <AuthProvider>
      <>
        <Nav />
        <Outlet />
        <Toaster />
      </>
    </AuthProvider>
  );
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/work-add",
        element: <AddWorkPage />,
      },
      {
        path: "/calender",
        element: <CalenderPage />,
      },
      {
        path: "/work-info/:workId",
        element: <WorkInfoPage />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
]);

export default router;
