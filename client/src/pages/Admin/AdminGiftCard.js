import React , {useState , useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
const GiftCard = () => {
  
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/giftVoucher/getVouchers')
      .then(response => response.json())
      .then(data => setVouchers(data))
      .catch(error => console.error('Error fetching voucher data:', error));
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
                <div className="row">
                    <div>
                        <div className="card mb-4">
                            <div className="card-body bg-light ">
                                <h5>Gift Card Issue Summary.</h5> 
                                <hr/>
                                <p><span className="fw-bold">Total Issuing : </span>{vouchers.length}</p>
                            </div>
                        </div>
                       
                       
                    </div>
                </div>
                <table class="table">
                <thead className="bg-dark">
                    <tr>
                    <th className="text-white text-center fw-normal">Sender Name</th>
                    <th className="text-white text-center fw-normal">Recipient Name</th>
                    <th className="text-white text-center fw-normal">Recipient Email</th>
                    <th className="text-white text-center fw-normal">Amount</th>
                    <th className="text-white text-center fw-normal">Timestamp</th>
                    </tr>
                </thead>
                <tbody id="voucherTableBody">
                {vouchers.map(voucher => (
                    <tr key={voucher._id}>
                        <td>{voucher.senderName}</td>
                        <td>{voucher.recipientName}</td>
                        <td>{voucher.recipientEmail}</td>
                        <td>$ {(voucher.amount)*10}</td>
                        <td className="text-center">{new Date(voucher.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    </tr>
                ))}
                </tbody>
                </table>  
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GiftCard;
