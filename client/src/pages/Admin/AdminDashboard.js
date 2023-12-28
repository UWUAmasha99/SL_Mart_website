import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import SaleStatistics from "./SaleStatistics";
import ProductStatistics from "./ProductStatistics";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />       
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3" 
            style={{
            marginLeft:"20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}>
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
            </div> 
            <br></br>
            <div className="col-md-9">
            <SaleStatistics/>
            </div> 
                 
          </div>
          <div className="col-md-12">
            <ProductStatistics/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
