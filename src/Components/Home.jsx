import React,{useState,useEffect} from "react";
import Nav from "./Navigation/Nav";
import axios from 'axios'
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Home = () => {
  const [rec,setRec]=useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const fetchRec=async()=>{
    const expe=JSON.parse(localStorage.getItem('user'))
    console.log(expe)
    await axios.get(`http://localhost:8000/api/recommendation/${expe.expertise}`).then((res)=>{
      console.log(res.data)
      setRec(res.data)
    })
  }

  useEffect(()=>{
    fetchRec()

  },[])


 
  

 

   
  return (
    <div>
      <Nav />
      <Modal title="Chat" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <TextArea rows={4} placeholder="Enter message"/>
     <p style={{marginTop:'2rem'}}> <input type="file"/> </p>
      
      </Modal>
      <div className="main">
        <div className="left">
        <ul>
        <li><i class="fas fa-home"></i> Home</li>
        <li><i class="fas fa-user-circle"></i> Profile</li>
        <li><i class="fab fa-blogger-b"></i> Blog</li>
        <li><i class="fas fa-comment-dots"></i> Chats</li>
        <li><i class="fas fa-cogs"></i> Settings</li>
        </ul>
        </div>
        <div className="right">
        <div className="right-head">
        Recommendations For You
        </div>
        <div className="card-cont">
        {
          rec.length>0&&rec.map((m)=>(
            <div className="card">
            <span><i class="fas fa-user"></i></span>
            <div>
            <p className="name">{m.name}</p>
            <p className="exp">{m.expertise.split("_").join(" ")}</p>
            </div>
            <div>
            <span className="mes" onClick={showModal}>message</span>
            </div>
            </div>
          ))
        }
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
