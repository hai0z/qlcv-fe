import { Outlet, createBrowserRouter } from "react-router-dom";
import Nav from "../components/navbar";
import HomePage from "../pages/homePage";
import AuthProvider, { AuthContext } from "../context/authProvider";
import Login from "../pages/login";
import CalenderPage from "../pages/calender/calenderPage";
import WorkInfoPage from "../pages/works/work-info/workInfoPage";
import { Toaster } from "react-hot-toast";
import AddWorkPage from "../pages/works/work-add/addWorkPage";
import ListUserPage from "../pages/users/listUser";
import DeadLine from "../pages/works/deadline/DeadLine";
import EditWorkPage from "../pages/works/work-edit/editWorkPage";
import Menu from "../pages/users/components/Menu";
import WorkStatusMenu from "../pages/works/work-status/components/workStatusMenu";
import AddUser from "../pages/users/addUser";
import WorkStatusPage from "../pages/works/work-status";
import DeadLineMenu from "../pages/works/deadline/components/Menu";
import Profile from "../pages/users/profile";
import Stats from "../pages/users/stats";
import { useContext } from "react";
import EditUserPage from "../pages/users/EditUserPage";
import ProtectedRoute from "./ProtectedRoute";

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

const WorkStatusLayout = () => {
  return (
    <div className="mx-6 lg:mx-28 bg-background min-h-screen pb-16">
      <div className="lg:pt-24 pt-8 w-full h-full">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <WorkStatusMenu />
          <div className="w-full xl:w-8/12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserLayout = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="mx-6 lg:mx-28 bg-background min-h-screen pb-16">
      <div className="lg:pt-24 pt-8 w-full h-full">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          {auth.role === "ADMIN" ? <Menu /> : null}
          <div className="w-full xl:w-8/12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const DeadLineLayout = () => {
  return (
    <div className="mx-6 lg:mx-28 bg-background min-h-screen pb-16">
      <div className="lg:pt-24 pt-8 w-full h-full">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <DeadLineMenu />
          <div className="w-full xl:w-8/12">
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
        path: "/work-status",
        element: <WorkStatusLayout />,
        children: [
          {
            path: "/work-status",
            element: <WorkStatusPage />,
          },
          {
            path: "/work-status/completed",
            element: <WorkStatusPage />,
          },
          {
            path: "/work-status/pasue",
            element: <WorkStatusPage />,
          },
          {
            path: "/work-status/pending",
            element: <WorkStatusPage />,
          },
        ],
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
        element: <DeadLineLayout />,
        children: [
          {
            path: "/deadline",
            element: <DeadLine />,
          },
          {
            path: "/deadline/upcoming",
            element: <DeadLine />,
          },
        ],
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
            element: (
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            ),
          },
          {
            path: "/users/stats",
            element: (
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            ),
          },
          {
            path: "/users/edit/:userId",
            element: (
              <ProtectedRoute>
                <EditUserPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
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
        <Toaster />
        <Login />
      </AuthProvider>
    ),
  },
]);

export default router;
