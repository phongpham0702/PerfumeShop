import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <header>
        <h1>Admin Panel</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
