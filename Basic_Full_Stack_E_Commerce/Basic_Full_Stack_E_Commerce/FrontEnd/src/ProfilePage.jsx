import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";


const Profile = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:8000/api/purchase/${userId}`)
      .then((res) => res.json())
      .then((data) => setPurchases(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-5">Shopping History</h2>
        <ul className="list-group">
          {purchases.map((item, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <span>{new Date(item.time).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Profile;
