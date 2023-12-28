import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentGateway = ({ cart }) => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the payment gateway token
  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get("/api/v1/product/braintree/token");
        setClientToken(data?.clientToken);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, []);

  // Handle payments
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
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {clientToken && (
        <DropIn
          options={{
            authorization: clientToken,
            paypal: {
              flow: "vault",
            },
          }}
          onInstance={(instance) => setInstance(instance)}
        />
      )}
      <button
        className="btn btn-primary"    
        onClick={handlePayment}
        disabled={loading || !instance}
      >
        {loading ? "Processing ...." : "Make Payment"}
      </button>
    </>
  );
};

export default PaymentGateway;
