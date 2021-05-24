import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuth } from '../../Routes/helpers';

const { Option } = Select;

const Signin = ({history}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const submitForm = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      console.log("fill all details");
      toast.error("Please fill all the fields!!");

      return;
    }

    await axios
      .post("http://localhost:8000/api/signin", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        toast.success("Signin successfull!!!");
        authenticate(res, () => {
       
          isAuth() && history.push('/');
        });
        setData({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    {isAuth() ? <Redirect to='/' /> : null}
    <div className="signup-main">
      <div className="signup-left">
        <span>Tessellate </span>
      </div>
      <div className="signup-right">
        <form onSubmit={submitForm}>
          <h2>Signin</h2>
          <div className="form-item">
            <label>Email</label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              value={data.email}
              type="email"
            />
          </div>
          <div className="form-item">
            <label>Password</label>
            <input
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
              required
              type="password"
            />
          </div>
          <center>No Account?<Link to="/signup">Signup</Link></center>
          <center>
            <input type="submit" value="Submit" />
          </center>
        </form>
        <ToastContainer />
      </div>
    </div>
    </>

  );
};

export default Signin;
