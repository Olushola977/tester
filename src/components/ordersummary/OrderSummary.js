import { useEffect, useState, useRef } from "react";
import "./OrderSummary.css";

/**
 * Order Summary Component
 */

const OrderSummary = () => {
  let [data, setData] = useState([]);
  let [restau, setRestau] = useState("");
  let [quantity, setQuantity] = useState([]);
  let [orderTotal, setOrderTotal] = useState("");
  
  useEffect(() => {
    const dataurl = "https://indapi.kumba.io/webdev/assignment";
    async function getData() {
      const fetchData = await fetch(dataurl);
      const response = await fetchData.json();
      console.log(response, "my data");
      setData((data = response.items));
      console.log(data, "user data");
      setRestau((restau = response.restaurant));
      console.log(restau, "restaurant");
    }
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5>Cart</h5>
              <div>
                {data ? (
                  data.map((item, index) => (
                    <div className="card my-3" key={index}>
                      <div className="item card-body">
                        <div className="item-name">
                          <h5>{item.name}</h5>
                          <span>Category: {item.category}</span>
                        </div>
                        <div className="item-price">
                          <p>
                            <span>{item.currency}</span>
                            <span className="price">{item.price}</span>
                          </p>
                        </div>
                        <div className="qty ms-auto">
                          <button
                            className="form-control btn btn-dark text-white"
                          >
                            +
                          </button>
                          <p className="mx-3 item-quantity">
                            <input type="number" defaultValue={item.quantity || ""} />  
                          </p>
                          <button className="form-control btn btn-dark text-white">
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h5>No Products</h5>
                )}
              </div>
              <div className="action-button">
                <button className="btn disabled btn-dark form-control">
                  Update Cart
                </button>
                <button className="ms-md-3 btn disabled btn-dark form-control">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="order-summary h-100">
            <h5>Order Summary</h5>
            <div>
                {data ? data.map(item => {
                     <div>
                         <h6>Sub-Total: </h6>
                        <span> 1900 </span>
                        <h6>Tax: </h6>
                        <span>760</span>
                     </div>
                }) : ""}
            </div>
            <div>
              <h6>Total: </h6>
              <span>100</span>
            </div>
            <div>
              <button className="btn form-control disabled checkout">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
