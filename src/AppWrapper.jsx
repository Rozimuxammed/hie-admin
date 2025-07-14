// AppWrapper.jsx
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import App from "./App";
import { setUser } from "./lib/redux/slices/auth/auth-slice";

export default function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  return <App />;
}
