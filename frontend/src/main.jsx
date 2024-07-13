import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: {},
  setUser: () => {},
  blogs: [],
  setBlogs: () => {},
  mode: "dark",
  setMode: () => {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState("dark");

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        blogs,
        setBlogs,
        mode,
        setMode,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary />
    <AppWrapper />
  </React.StrictMode>
);
