import React,{useState} from "react";
import { Select } from 'antd';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuth } from '../../Routes/helpers';
import { Input } from 'antd';

const { TextArea } = Input;
const { Option } = Select;



const Signup = () => {
    const [data,setData]=useState({
        name:'',
        email:'',
        expertise:'',
        password:'',
        confirmpassword:''
    })

    function onChange(value) {
        console.log(`selected ${value}`);
        setData({...data,expertise:value})
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }

      const submitForm=async (e)=>{
        e.preventDefault()
        if(!data.name || !data.email || !data.password || !data.confirmpassword || !data.expertise){
            console.log("fill all details")
            toast.error("Please fill all the fields!!")

            return;
        }
if(data.password!== data.confirmpassword){
    console.log("passwords do not match ")
    toast.error("Passwords do not match!!!")
    return;
}

await axios.post("http://localhost:8000/api/signup",{
    name:data.name,
    email:data.email,
    password:data.password,
    expertise:data.expertise
}).then((res)=>{
    console.log(res)
    toast.success(res.data.message)
    setData({
        name:'',
        email:'',
        password:'',
        expertise:''
    ,
    confirmpassword:''
    })
})
.catch((err)=>{
    console.log(err)
})





      }
      
  return (
    <>    {isAuth() ? <Redirect to='/' /> : null}

    <div className="signup-main">
      <div className="signup-left">
        <span>Tessellate </span>
      </div>
      <div className="signup-right">
        <form onSubmit={submitForm}>
          <h2>Signup</h2>
          <div className="form-item">
            <label>Name</label>
            <input required onChange={(e)=>setData({...data,name:e.target.value})} value={data.name} type="text" />
          </div>
          <div className="form-item">
            <label>Email</label>
            <input onChange={(e)=>setData({...data,email:e.target.value})} required value={data.email} type="email" />
          </div>
          <div className="form-item">
            <label>Expertise</label>
            <Select
            value={data.expertise}
            showSearch
            style={{ width: 200 }}
            placeholder="Select a expertise"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="java">Java</Option>
            <Option value="web_development">Web Development</Option>
            <Option value="app_development">App Development</Option>
            <Option value="Python">Python</Option>
            <Option value="JavaScript">JavaScript</Option>
          </Select>
            
          </div>
          <div className="form-item">
            <label>Password</label>
            <input onChange={(e)=>setData({...data,password:e.target.value})} value={data.password}  required type="password" />
          </div>
          <div className="form-item">
            <label>Confirm Password</label>
            <input onChange={(e)=>setData({...data,confirmpassword:e.target.value})}  required value={data.confirmpassword} type="password" />
          </div>
          <center>Already have an account?<Link to="/signin">Signin</Link></center>
          <center>
          <input type="submit" value="Submit"/></center>
        </form>
        <ToastContainer/>

      </div>
    </div>
    </>
  );
};

export default Signup;
