import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import RequireLogin from "./components/RequireLogin";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Editor from "./components/Editor";
import LinkPage from "./components/LinkPage";
import Lounge from "./components/Lounge";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import PersistanceLogin from "./components/PersistanceLogin";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PersistanceLogin />}>
          <Route element={<RequireLogin roles={[2001]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireLogin roles={[1984]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireLogin roles={[5150]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireLogin roles={[5150, 1984]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* Catch All Error */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
