import { useEffect, useState } from "react";
import { UserImage } from "../image/Image";
import "./Profile.css";

/**
 * User Profile Component
 */

const Profile = () => {
  const URL = "https://indapi.kumba.io/webdev/assignment";
  // const myData = useRef({ userData: "" });
  // const userLikes = useRef({ userLikes: "" });
  let [data, setData] = useState("");
  let [likes, setLikes] = useState([]);
  let [dislikes, setDisLikes] = useState([]);
  useEffect(() => {
    const dataurl = URL;
    async function getData() {
      const fetchData = await fetch(dataurl);
      const response = await fetchData.json();
      console.log(response, "my data");
      setData((data = response));
      console.log(data, "user data");
      setLikes((likes = data.user.likes));
      setDisLikes((dislikes = data.user.dislikes));
    }
    getData();
  }, []);

  const Name = () => {
    const name = data ? data.user.name : "";
    return (
      <div
        style={{
          marginTop: "8px",
          marginBottom: "10px",
        }}
      >
        {name ? <h5>{name}</h5> : ""}
      </div>
    );
  };

  const PhoneNumber = () => {
    const phone = data ? data.user.phone : "";
    return (
      <div>
        {phone ? (
          <>
            <h6>Phone: </h6> <a href={`tel:${phone}`}><code>{phone}</code></a>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  const About = () => {
    const about = data ? data.user.about : "";
    return (
      <div
        style={{
          marginTop: "15px"
        }}
      >
        <h5>About</h5>
        {about ? <em>{about}</em> : ""}
      </div>
    );
  };

  const Address = () => {
    const address = data ? data.user.address : "";
    return (
      <div style={{
          marginTop: "15px"
      }}>
        {address && (
          <>
            <h6>Address: </h6>
            <address> {address} </address>
          </>
        )}
      </div>
    );
  };

  const Likes = () => {
    const like = likes ? likes : "";
    return (
      <div>
        <p className="pre-header">Likes</p>
        <ul className="list">
          {like &&
            like.map((item, index) => <li key={index}> {item}, </li>)}
        </ul>
      </div>
    );
  };

  const DisLikes = () => {
    const dislike = dislikes ? dislikes : "";
    return (
      <div>
        <p className="pre-header">Dislikes</p>
        <ul className="list">
          {dislike &&
            dislike.map((item, index) => <li key={index}> {item}, </li>)}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="user-image">
                <img alt="" src={UserImage} className="img-fluid"></img>
              </div>
              <Name />
              <div className="about-section">
              <About />
              <div className="d-flex preference">
                <Likes />
                <DisLikes />
              </div>
              <PhoneNumber />
              <Address />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
