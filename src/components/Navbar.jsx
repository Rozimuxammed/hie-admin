import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Moon, Sun, Menu, X, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../lib/redux/slices/auth/auth-slice";
import { useDarkMode } from "../hooks/useDarkMode";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Navbar() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <header>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b dark:border-b-gray-400">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <Link to="/" className="text-black dark:text-white">
              JobGlobe
            </Link>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 items-center text-black dark:text-white">
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
          </ul>

          {/* Actions: Theme, Select, Logout */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Select */}
            <Select>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eng">ENG</SelectItem>
                <SelectItem value="zh">ZH</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
              </SelectContent>
            </Select>

            {/* Dark Mode Toggle */}
            <Button
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer"
              variant="outline"
              size="icon"
            >
              {darkMode ? <Sun /> : <Moon />}
            </Button>

            {/* Logout */}
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setUser(false));
              }}
              className="cursor-pointer"
              variant="outline"
            >
              LogOut <LogOut className="ml-2" size={16} />
            </Button>
          </div>

          {/* Mobile: Only Menu and Dark Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={() => setDarkMode(!darkMode)}
              variant="outline"
              size="icon"
              className="text-black dark:text-white"
            >
              {darkMode ? <Sun /> : <Moon />}
            </Button>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="outline"
              size="icon"
              className="text-black dark:text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-black px-6 pb-4 pt-2 space-y-4">
            <ul className="flex flex-col gap-4 text-black dark:text-white">
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold underline underline-offset-4"
                      : "hover:underline"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>

            {/* Theme Select */}
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            {/* Logout */}
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setUser(false));
              }}
              variant="outline"
              className="w-full"
            >
              LogOut
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
