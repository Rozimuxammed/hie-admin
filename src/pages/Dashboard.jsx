// pages/Dashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const jobData = [
  { month: "Jan", jobs: 120 },
  { month: "Feb", jobs: 200 },
  { month: "Mar", jobs: 180 },
  { month: "Apr", jobs: 250 },
  { month: "May", jobs: 300 },
  { month: "Jun", jobs: 280 },
];

const userData = [
  { name: "Employers", value: 300 },
  { name: "Job Seekers", value: 700 },
];

const COLORS = ["#4f46e5", "#10b981"];

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

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Job Portal Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="flex items-center justify-center flex-col text-center py-6">
          <CardTitle className="text-lg">Total Job Posts</CardTitle>
          <p className="text-3xl font-bold mt-2">12,354</p>
        </Card>

        <Card className="flex items-center justify-center flex-col text-center py-6">
          <CardTitle className="text-lg">New Today</CardTitle>
          <p className="text-3xl font-bold mt-2">127</p>
        </Card>

        <Card className="flex items-center justify-center flex-col text-center py-6">
          <CardTitle className="text-lg">Active Employers</CardTitle>
          <p className="text-3xl font-bold mt-2">1,089</p>
        </Card>

        <Card className="flex items-center justify-center flex-col text-center py-6">
          <CardTitle className="text-lg">Job Seekers</CardTitle>
          <p className="text-3xl font-bold mt-2">9,754</p>
        </Card>

        <Card className="flex items-center justify-center flex-col text-center py-6">
          <CardTitle className="text-lg">Countries</CardTitle>
          <p className="text-3xl font-bold mt-2">23</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Monthly Job Posts</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="jobs"
                  fill="#4f46e5"
                  radius={[4, 4, 0, 0]}
                  activeBar={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {userData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
