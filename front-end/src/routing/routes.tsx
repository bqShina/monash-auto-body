import { createBrowserRouter } from "react-router-dom";
import { FormPage } from "../pages/FormPage";
import { RecordsPage } from "../pages/RecordsPage";
import { SuccessPage } from "../pages/SuccessPage";

import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";

export const router = createBrowserRouter([
  { path: "/", element: <FormPage /> },
  { path: "/update", element: <FormPage /> },
  // { path: "/update/:id", element: <FormPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/records", element: <RecordsPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/success", element: <SuccessPage /> },
]);
