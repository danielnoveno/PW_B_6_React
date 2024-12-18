import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoutes from "./ProtectedRoute";

// Auth Pages
import UserLoginPage from "../pages/auth/UserLoginPage";
import UserRegister from "../pages/auth/UserRegister";

// User Pages
import Profile from "../pages/user/Profile";
import Dashboard from "../pages/user/Dashboard";
import Transaksi from "../pages/user/Transaksi";
import Unduhan from "../pages/user/Unduhan";
import Bookmark from "../pages/user/Bookmark";
import EditProfile from "../pages/user/EditProfile";
import DetailBuku from "../pages/user/DetailBuku";
import MyDigi from "../pages/user/MyDigilibrary";
import GantiPass from "../pages/user/GantiPassword";
import RiwayatPage from "../pages/user/Riwayat";

// Admin Pages
import ProfileAdmin from "../pages/admin/Profile";
import EditProfileAdmin from "../pages/admin/EditProfile";
import DashboardAdmin from "../pages/admin/Dashboard";
import ManageBuku from "../pages/admin/ManajemenBuku";
import Unggah from "../pages/admin/Unggah";
import ManajemenUser from "../pages/admin/ManajemenUser";

const PageComponent = ({ title, children }) => (
  <>
    <Helmet>
      <title>{title} - DigiLibrary</title>
    </Helmet>
    {children}
  </>
);

const routes = [
  {
    path: "/",
    element: (
      <PageComponent title="Login">
        <UserLoginPage />
      </PageComponent>
    ),
  },
  {
    path: "/register",
    element: (
      <PageComponent title="Register">
        <UserRegister />
      </PageComponent>
    ),
  },
  {
    path: "/password",
    element: (
      <PageComponent title="Ganti Password">
        <GantiPass />
      </PageComponent>
    ),
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: (
              <PageComponent title="Dashboard">
                <Dashboard />
              </PageComponent>
            ),
          },
          {
            path: "/bookmark",
            element: (
              <PageComponent title="Bookmark">
                <Bookmark />
              </PageComponent>
            ),
          },
          {
            path: "/digilibrary",
            element: (
              <PageComponent title="My DigiLibrary">
                <MyDigi />
              </PageComponent>
            ),
          },
          {
            path: "/unduhan",
            element: (
              <PageComponent title="Unduhan">
                <Unduhan />
              </PageComponent>
            ),
          },
          {
            path: "/transaksi",
            element: (
              <PageComponent title="Transaksi">
                <Transaksi />
              </PageComponent>
            ),
          },
          {
            path: "/riwayat",
            element: (
              <PageComponent title="Riwayat">
                <RiwayatPage />
              </PageComponent>
            ),
          },
          {
            path: "/profile",
            element: (
              <PageComponent title="Profile">
                <Profile />
              </PageComponent>
            ),
          },
          {
            path: "/edit-profile",
            element: (
              <PageComponent title="Edit Your Profile">
                <EditProfile />
              </PageComponent>
            ),
          },
          {
            path: "/detail-buku",
            element: (
              <PageComponent title="Detail Buku">
                <DetailBuku />
              </PageComponent>
            ),
          },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: (
              <PageComponent title="Dashboard Admin">
                <DashboardAdmin />
              </PageComponent>
            ),
          },
          {
            path: "manage-buku",
            element: (
              <PageComponent title="Manage Buku">
                <ManageBuku />
              </PageComponent>
            ),
          },
          {
            path: "manage-user",
            element: (
              <PageComponent title="Manage User">
                <ManajemenUser />
              </PageComponent>
            ),
          },
          {
            path: "unggah-buku",
            element: (
              <PageComponent title="Unggah Buku">
                <Unggah />
              </PageComponent>
            ),
          },
          {
            path: "profile",
            element: (
              <PageComponent title="Profile Admin">
                <ProfileAdmin />
              </PageComponent>
            ),
          },
          {
            path: "edit-profile",
            element: (
              <PageComponent title="Edit Profile Admin">
                <EditProfileAdmin />
              </PageComponent>
            ),
          },
        ],
      },
    ],
  },
];

export default routes;