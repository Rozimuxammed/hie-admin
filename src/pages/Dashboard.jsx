// pages/Dashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const createdAt = localStorage.getItem("token_created_at");

      if (token && createdAt) {
        const now = Date.now();
        const tokenAge = now - parseInt(createdAt, 10);
        const maxAge = 24 * 60 * 60 * 1000; // 24 soat

        if (tokenAge >= maxAge) {
          localStorage.removeItem("token");
          localStorage.removeItem("token_created_at");
          localStorage.removeItem("user");
          clearInterval(interval);
          navigate("/login");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return <div className="container mx-auto px-2.5">Dashboard</div>;
}
