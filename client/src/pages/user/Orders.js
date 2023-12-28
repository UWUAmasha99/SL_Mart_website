import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import StarRating from "./StarRating";
import moment from "moment";
import "../../styles/ProductDetailsStyles.css";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../../components/Rating";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useAuth();
  const [rating, setRating] = useState({});
  const [userRatings, setUserRatings] = useState({}); // Keep track of user's product ratings
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  // const getOrders = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/auth/orders");
  //     setOrders(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


 
 
   const getOrders = async () => {
     try {
       const { data } = await axios.get("/api/v1/auth/orders");
       //console.log(data[1].products[0].category);
       setOrders(data);
       //getCategoriesfromOrders();
     } catch (error) {
       console.log(error);
     }
   };
 
   async function getCategoriesfromOrders(){
     try{
       let categoryArray = [];
 
       for(var i=0; i<orders.length; i++){
         
         for(var j=0; j<orders[i].products.length; j++){
           //console.log(orders[i].products[j].category);
           var categoryId = orders[i].products[j].category;
 
           if(!categoryArray.includes(categoryId)){
             categoryArray.push(categoryId);
           }
 
         }
 
       }
 
       console.log(categoryArray);
       setCategories(categoryArray);
       //fetchSimilarProducts(categoryArray);
       
       
       //return ;
     } catch(error){
       console.log(error);
     }
   }
 
   
 
   const fetchSimilarProducts = async () => {
     try {
 
       const { data } = await axios.get('/api/v1/product/similar-products', {
         params: {
           categoryIds: JSON.stringify(categories),
         },
       });
       
       console.log('Here 1');
       console.log(data);
       setRelatedProducts(data);
       //relatedProducts = data;
       //console.log(relatedProducts);
     } catch (error) {
       console.error(error);
     }
   };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  useEffect(() => {
    if (orders.length > 0) {
      getCategoriesfromOrders();
    }
  }, [orders]);

  useEffect(() => {   
    if (categories.length > 0) {
      fetchSimilarProducts();
    }
  } , [categories]);

  useEffect(() => {
    // Create a map of user's ratings for products from orders
    const userRatingsMap = {};

    orders.forEach((o) => {
      o.products.forEach((p) => {
        if (p.rating) {
          userRatingsMap[p._id] = true;
        }
      });
    });

    setUserRatings(userRatingsMap);
  }, [orders]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (event, productId) => {
    event.preventDefault();

    // Check if the user has already rated this product
    if (userRatings[productId]) {
      toast.error("You have already rated this product");
      return;
    }

    // Assuming you have access to the userId
    const userId = auth?.user;

    const response = await axios.post('/api/v1/submit-rating', {
      userId,
      productId,
      rating,
    });

    if (response.status === 201) {
      toast.success("Rating submitted Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"200px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                          <form key={p._id} onSubmit={(event) => handleSubmit(event, p._id)}>
                            <StarRating
                              initialRating={rating}
                              onRatingChange={handleRatingChange}
                            />
                            <button
                              type="submit"
                              disabled={userRatings[p._id]}  // Disable if already rated
                              className="submit-rating-button"
                              style={{
                                backgroundColor: "#0DC74E",
                                color: "#000",
                                padding: "1px",
                                fontSize: "15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              <b>{userRatings[p._id] ? 'Rated' : 'Submit Rating'}</b>
                            </button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="row container similar-products">
        <h4>Products You Might Be Interested In ➡️</h4>
        {relatedProducts?.length < 100 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {console.log('In layout')}
          {console.log(relatedProducts.similarProducts)}

          <div className="d-flex flex-wrap">
          {relatedProducts?.similarProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>s
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <Rating productId={p._id} />
                <div className="card-name-price">
                  <button
                    className="btn btn-success ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-warning ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
