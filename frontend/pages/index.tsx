import React from "react";
import axios from "axios";
const httpHead = "http://0.0.0.0:3000/";

const index = () => {
  const handleRequest = async () => {
    const response = await axios.get(httpHead + "users");
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  const postUser = async () => {
    const response = await axios.post(httpHead + "users", {
      name: "Josey",
      email: "aaa@com",
    });
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  const deleteUser = async () => {
    const response = await axios.delete(httpHead + "users/1");
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleRequest()}>Click</button>
      </div>
      <div>
        <button onClick={() => postUser()}>post</button>
      </div>
      <div>
        <button onClick={() => deleteUser()}>Delete</button>
      </div>
    </div>
  );
};

export default index;
