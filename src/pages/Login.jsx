import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../lib/redux/slices/auth/auth-slice";
import { login } from "../requests";
import { validation } from "../validations";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // 👈 qo‘shildi

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const hundleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = {};

    for (let [key, value] of formData.entries()) {
      res[key] = value;
    }

    const result = validation(res);
    if (result) {
      const { target, message } = result;
      e.target[target].focus();
      toast.error(message);
    } else {
      login(res).then(
        (res) => {
          dispatch(setUser(res)); // Reduxga user
          toast.success("Muvaffaqiyatli kirdingiz");
          navigate("/");
        },
        ({ message }) => {
          toast.error(message || "Login xatosi");
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-[10px] p-6 w-full max-w-md sm:max-w-md">
        <h1 className="text-center text-3xl font-bold mb-6 text-black dark:text-white">
          Login
        </h1>
        <form onSubmit={hundleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <Label className="flex flex-col items-start gap-2 w-full text-black dark:text-white">
            <span>Email</span>
            <Input type="email" name="email" placeholder="Email kiriting..." />
          </Label>

          {/* Password */}
          <Label className="flex flex-col items-start gap-2 w-full text-black dark:text-white relative">
            <span>Parol</span>
            <div className="relative w-full">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Parol kiriting..."
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Label>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full cursor-pointer"
            variant="outline"
          >
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
}
