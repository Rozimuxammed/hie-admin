// App.jsx
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";

export default function App() {
  const { user } = useSelector((state) => state.auth);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}
