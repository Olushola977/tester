import { useEffect, useState} from "react";
import { Restaurant } from "../image/Image";
import "./OrderSummary.css";

/**
 * Order Summary Component
 */

const OrderSummary = () => {
  let [data, setData] = useState([]);
  let [restau, setRestau] = useState("");
  let subTotal = [];
  let subTotalResult = "";
  let taxTotal = [];
  let taxTotalResult = "";
  let grandTotal = "";

  useEffect(() => {
    const dataurl = "https://indapi.kumba.io/webdev/assignment";
    async function getData() {
      const fetchData = await fetch(dataurl);
      const response = await fetchData.json();
      setData((data = response.items));
      setRestau((restau = response.restaurant));
    }
    getData();
  }, []);

  const preview = (total, num) => {
    const sub = total * num;
    subTotal.push(sub);
    const concat = add(subTotal);
    subTotalResult = concat;
  };

  const add = (num) => {
    const res = num.reduce((a, b) => a + b, 0);
    return res;
  };

  const tax = (num) => {
    taxTotal.push(num);
    const concat = add(taxTotal);
    taxTotalResult = concat;
  };

  const Total = (sub, tax_p) => {
    const final = (sub / tax_p) * 100;
    grandTotal = final;
  };

  return (
      <>
      <div style={{
          background: `linear-gradient(
            rgba(255, 0, 0, 0.45), 
            rgba(255, 0, 0, 0.45)
          ), url(${Restaurant})`
      }} className="restaurant">
          {restau ? (
              <div>
                    <div className="restaurant-name">
                      <h1>{restau.name}</h1>
                      <p style={{
                          marginTop: "15px"
                      }}>{restau.street}, {restau.zipcode}, {restau.city}, {restau.state} </p>
                    </div>
              </div>
          ) : ""}
      </div>
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5>Cart</h5>
              <div>
                {data ? (
                  data.map((item, index) => (
                    <div
                      className="card my-3"
                      key={index}
                      onLoad={preview(item.price, item.quantity)}
                    >
                      <div className="item card-body">
                        <div className="item-name">
                          <h5>{item.name}</h5>
                          <span>Category: {item.category}</span>
                        </div>
                        <div className="item-price">
                          <p>
                            <span>{item.currency} </span>
                            <span className="price" onLoad={tax(item.tax_pct)}>
                              {item.price}
                            </span>
                          </p>
                        </div>
                        <div className="qty ms-auto">
                          <button
                            id={index}
                            className="form-control btn btn-dark disabled text-white"
                          >
                            +
                          </button>
                          <p className="mx-3 item-quantity">
                            <input
                              onLoad={Total(subTotalResult, taxTotalResult)}
                              type="number"
                              defaultValue={item.quantity || ""}
                            />
                          </p>
                          <button className="form-control btn btn-dark disabled text-white">
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
            <div className="header"><h5>Order Summary</h5></div>
            <div style={{
                marginTop: "22px"
            }}>
            <div className="table d-flex">
              <h6>Sub-Total: </h6>
              <span> {subTotalResult} </span>
            </div>
            <div className="table d-flex">
              <h6>Tax: </h6>
              <span>{taxTotalResult}</span>
            </div>
            <div className="table d-flex" style={{borderTop: "1px solid #000"}}>
              <h6>Total: </h6>
              <span>{grandTotal}</span>
            </div>
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
    </>
  );
};

export default OrderSummary;
