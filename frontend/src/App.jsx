import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts/layout";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Auth/Login";
import { useEffect } from "react";
import { checkAuth } from "./components/redux/authSlice";
import { Toaster } from "sonner";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import CheckAuth from "./components/common/CheckAuth";
import Project from "./pages/Projects/Project";
import AuthPage from "./pages/Auth/AuthPage";
function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <Layout />
            </CheckAuth>
          }>

          <Route path="login" element={<AuthPage />} />
          <Route path="register" element={<AuthPage />} />
        </Route>
        {
          isAuthenticated&&(
            <Route path="/" element={<Layout/>}>
              <Route path="projects" element={<Project />} />
            </Route>
          )
        }
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
