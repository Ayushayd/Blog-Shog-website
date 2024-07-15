import React, { useContext, useState } from "react";
import { Context } from "../../main";
import Sidebar from "../layout/Sidebar";
import MyProfile from "../miniComponent/MyProfile";
import CreateBlog from "../miniComponent/CreateBlog";
import Chart from "../miniComponent/Chart";
import MyBlogs from "../miniComponent/MyBlog";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [component, setComponent] = useState("My Blogs");
  const { mode, isAuthenticated, user } = useContext(Context);

  if (!isAuthenticated || user.role === "Reader") {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <Sidebar setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Chart" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;
