import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./lib/redux/slices/store.js";
import { Toaster } from "sonner";
import AppWrapper from "./AppWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppWrapper />
    <Toaster position="top-right" richColors />
  </Provider>
);
