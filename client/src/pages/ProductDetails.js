import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import Rating from "../components/Rating";

import { Canvas, useLoader } from "@react-three/fiber";
import { MeshWobbleMaterial, OrbitControls, PresentationControls, Environment, ContactShadows } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const scaleVal = 2;
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  function Model({ url }) {
    const { nodes, materials } = useGLTF(url);
    return <primitive object={nodes.default} material={materials.default} />;
  }

  const ObjectViewer = ({ url }) => {

    const gltf = useLoader(GLTFLoader, url);
    // const [scale, setScale] = useState(2);

    // useEffect(() => {
    //   const handleResize = () => {
    //     setScale(window.innerWidth < 800 ? 0.2 : 0.5);
    //   };

    //   window.addEventListener('resize', handleResize);

    //   return () => {
    //     window.removeEventListener('resize', handleResize);
    //   };
    // }, []);

    return (
      <Canvas id="myCanvas"  height={800} >
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <perspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
        <OrbitControls />
        <group position={[0, 0, 0]}
          scale={[scaleVal, scaleVal, scaleVal]}
        >
          <primitive object={gltf.scene} />
        </group>
        <Environment preset="sunset" />

        <ContactShadows position={[0, -1.4, 0]} opacity={0.25} scale={10} blur={2.5} far={4} />
      </Canvas>
    );
  };




  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-3"></div>
        <div className="col-md-3">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6><b>Name : </b>{product.name}</h6>
          <h6><b>Description :</b> {product.description}</h6>
          <h6>
            <b>Price : </b>
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6><b>Category :</b> {product?.category?.name}</h6>
          <Rating productId={product._id} />

          <button
                    className="btn btn-warning ms-1"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
          
          {/* <button class="btn btn-warning ms-1"
          // onClick={() => {
          //   setCart([...cart, p]);
          //   localStorage.setItem(
          //     "cart",
          //     JSON.stringify([...cart, p])
          //   );
          //   toast.success("Item Added to cart");
          // }}
          >
            ADD TO CART</button> */}
        </div>
        <div className="col-md-2">

        </div>
      </div>
      <div className="model-top-spacer"></div>
      <div>
      
      {product._id && product.model3D &&(
        <h2 className="text-center">Product 3D Model</h2>
        )}
      {product._id && product.model3D &&(
        <div className="model-container" >
        <hr/>
          

            <ObjectViewer url={`/api/v1/product/product-3d-model/${product._id}`} />

          
        </div>
        )}
        <div className="model-top-spacer"></div>
        
      </div>


      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
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
    </Layout>
  );
};

export default ProductDetails;
