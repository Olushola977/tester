import { useEffect, useState} from "react";
import { Restaurant } from "../image/Image";
import "./OrderSummary.css";

/**
 * Order Summary Component
 */

const OrderSummary = () => {
  const URL = "https://indapi.kumba.io/webdev/assignment";
  let [data, setData] = useState([]);
  let [restau, setRestau] = useState("");
  let subTotal = [];
  let subTotalResult = "";
  let taxTotal = [];
  let taxTotalResult = "";
  let grandTotal = "";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataurl = URL;
      const fetchData = await fetch(dataurl);
      const response = await fetchData.json();
      setData((data = response.items));
      setRestau((restau = response.restaurant));
  }

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
          background: `linear-gradient(rgb(255 24 0 / 57%), rgb(93 2 115 / 45%)), url(${Restaurant})`
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
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="cont card-body">
              <h5>Cart</h5>
              <div>
                {data ? (
                  data.map((item, index) => (
                    <div
                      className="card my-3"
                      key={index}
                      onLoad={preview(item.price, item.quantity)}
                    >
                      <div className="item d-block d-md-flex align-items-md-center card-body">
                        <div className="item-name mb-2 mb-md-0">
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
                        <div className="qty d-flex justify-content-space-between 
                          align-items-center ms-auto">
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
              <div className="action-button d-block d-md-flex">
                <button className="btn disabled btn-dark form-control">
                  Update Cart
                </button>
                <button className="ms-md-3 mt-2 mt-md-0 btn disabled btn-dark form-control">
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
