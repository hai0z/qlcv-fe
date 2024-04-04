import { Outlet, createBrowserRouter } from "react-router-dom";
import Nav from "../components/navbar";
import HomePage from "../pages/homePage";
import AuthProvider from "../context/authProvider";
import Login from "../pages/login";
import CalenderPage from "../pages/calender/calenderPage";
import WorkInfoPage from "../pages/works/work-info/workInfoPage";
import { Toaster } from "react-hot-toast";
import AddWorkPage from "../pages/works/work-add/addWorkPage";
import ListUserPage from "../pages/users/listUser";
import DeadLine from "../pages/works/deadline/DeadLine";
import EditWorkPage from "../pages/works/work-edit/editWorkPage";
import Menu from "../pages/users/components/Menu";
import AddUser from "../pages/users/addUser";
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
const UserLayout = () => {
  return (
    <div className="mx-6 lg:mx-28 bg-background min-h-screen pb-16">
      <div className="lg:pt-24 pt-8 w-full h-full">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <Menu />
          <div
            className="w-full xl:w-8/12"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
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
      {
        path: "/work-edit/:workId",
        element: <EditWorkPage />,
      },
      {
        path: "/deadline",
        element: <DeadLine />,
      },
      {
        path: "/users",
        element: <UserLayout />,
        children: [
          {
            path: "/users",
            element: <ListUserPage />,
          },
          {
            path: "/users/add-user",
            element: <AddUser />,
          },
        ],
      },
      {
        path: "*",
        element: <HomePage />,
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
