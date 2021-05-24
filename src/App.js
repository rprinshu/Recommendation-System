import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "./App.css";
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";
import Home from './Components/Home'
import {Switch,Route} from 'react-router-dom';
import Nav from "./Components/Navigation/Nav"
import Activate from "./Components/Auth/Activate"

import PrivateRoute from './Routes/PrivateRoute'

function App() {
  return (
    
    <div className="App">
    <Switch>
    <PrivateRoute exact path="/" component={Home}/>
    <Route exact path ="/signup" component={Signup}/>
    <Route exact path ="/signin" component={Signin}/>
    <Route exact path ="/auth/activate/:token" component={Activate}/>
    </Switch>
    </div>
   
  );
}

export default App;
