import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { InstitutionsPage } from "./pages/InstitutionsPage";
import { InstitutionProfilePage } from "./pages/InstitutionProfilePage";
import { BookingPage } from "./pages/BookingPage";
import { UserDashboard } from "./pages/dashboards/UserDashboard";
import { InstitutionDashboard } from "./pages/dashboards/InstitutionDashboard";
import { AdminDashboard } from "./pages/dashboards/AdminDashboard";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "forgot-password", Component: ForgotPasswordPage },
      { path: "institutions", Component: InstitutionsPage },
      { path: "institutions/:id", Component: InstitutionProfilePage },
      { path: "book/:institutionId", Component: BookingPage },
      { path: "dashboard/user", Component: UserDashboard },
      { path: "dashboard/institution", Component: InstitutionDashboard },
      { path: "dashboard/admin", Component: AdminDashboard },
      { path: "settings", Component: SettingsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
