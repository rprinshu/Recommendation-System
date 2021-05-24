import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuth } from '../../Routes/helpers';

const { Option } = Select;

const Activate = ({history,match}) => {
    console.log(history,match)
    const activate = async() => {
await axios.post("http://localhost:8000/api/account-activation",{token:match.params.token})
.then((res)=> {
    toast.success("Activation Successfull ! Please sign In")
    history.push("/signin")
})
    }
 
  return (
    <>
    {isAuth() ? <Redirect to='/' /> : null}
    <div className="signup-main">
      <div className="signup-left">
        <span>Tessellate </span>
      </div>
      <div className="signup-right">
       <span onClick={activate} className="activate-btn">Activate</span>
        <ToastContainer />
      </div>
    </div>
    </>

  );
};

export default Activate;