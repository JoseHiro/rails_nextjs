import React from "react";
import axios from "axios";
const httpHead = "http://localhost:4000/";

const index = () => {
  const handleRequest = async () => {
    const response = await axios.get(httpHead + "users");
    if (response.status === 200) {
      console.log(response.data);
    }
  };
  return (
    <div>
      <div>
        <button onClick={() => handleRequest()}>Click</button>
      </div>
    </div>
  );
};

export default index;
