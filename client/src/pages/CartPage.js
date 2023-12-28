import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [card_id, setCardId] = useState('');
  const [discount,setDiscount] = useState('');
  const [status, setStatus]= useState('Issued')
  const [recipientEmail, setRecipientEmail] = useState('');
  
  
  const navigate = useNavigate();
  // let discount = 500;

  //total price
  const totalPrice = () => {
    
    try {
      let total = 0;
      let subtotal = 0;
      let voucherDisc = discount*10000;
      console.log(voucherDisc);

      cart?.map((item) => {
        total = total + item.price ;
      });
      subtotal = total;
      total = total -voucherDisc;
      const displayTotal = total < 0 ? 0 : total;
      console.log('Final total : ', total);
      // return total.toLocaleString("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // });
      const formattedTotal = displayTotal.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
  
      const formattedSubtotal = subtotal.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
        
      return { displayTotal: formattedTotal, subtotal: formattedSubtotal };
    } catch (error) {
      console.error(error);
      return { total: 'Error', subtotal: 'Error' };
    }
  };

  
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //get discount
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setStatus("Issued")
    // console.log(status);
    try {
      const response = await axios.get('/giftVoucher/getVoucherq',{
        params:{
          recipientEmail,card_id,status
        },
      });
      setDiscount(response.data.amount);

      console.log('Voucher dtl', response.data.amount);
      toast.success("Voucher Applied");
      await axios.put('/giftVoucher/revokeVoucher', {
        recipientEmail,
        card_id,
      });
    } catch (error) {
      toast.error("Invalid Voucher");
      console.error('Error fetching voucher:', error);
    }
  }

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          

          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
          <div className="col-md-3"></div>
            <div className="col-md-6  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    {p.description && <p>{p.description.substring(0, 30)}</p>}
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>





            {/* <div className="col-md-6"></div> */}
            <div className="col-md-6 cart-summary ">
              <h2>Checkout</h2>
              <p>Total | Checkout | Payment</p>
              <hr />            
              
              <h2>Voucher Claim</h2>
                <form onSubmit={handleSubmit} className="form-section">
                  <div className="">
                  <div className="row  w-75 mx-auto">
                  <label className="w-50 mt-2"> Recipient Email:</label>
                  <input
                    className="form-control w-50"
                    type="text"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
                <div className="row w-75 mx-auto">
                  <label className="w-50 mt-2"> Voucher Code:</label>
                  <input
                  className="form-control w-50"
                    type="text"
                    value={card_id}
                    onChange={(e) => setCardId(e.target.value)}
                  />
                </div>    
                <button className="btn btn-primary w-25 mt-3" type="submit">Claim Voucher</button>

                  </div>
                </form>
              <hr />
              <h4>Sub Total : {totalPrice().subtotal} </h4>
              <h4>Total : {totalPrice().displayTotal} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h5>Current Address : </h5>
                    <h6><i>{auth?.user?.address}</i></h6>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}


              <div className="mt-2 payement">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
