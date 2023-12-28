import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const menuStyle = {
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    height: "600px",
    padding: "50px",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    marginBottom: "20px",
  };

  const linkStyle = {
    fontSize: "1.2rem",
    margin: "10px 0", 
  };

  return (
    <div className="text-center">
      <div className="list-group dashboard-menu" style={menuStyle}>
        <h4 style={headingStyle}>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Orders
        </NavLink>
        {/* <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Users
        </NavLink> */}
        <NavLink
          to="/dashboard/admin/Gift"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          Gift Card
        </NavLink>
        <NavLink
          to="/dashboard/admin/feedback"
          className="list-group-item list-group-item-action"
          style={linkStyle}
        >
          FeedBack
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
