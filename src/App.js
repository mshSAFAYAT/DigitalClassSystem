import React from "react";
import SignUp from "./component/SignUp";
import LogIn from "./component/LogIn";
import {BrowserRouter,Link,Route,Switch} from "react-router-dom";
import UpdateProfile from './component/UpdateProfile';
import HomePage from  "./component/Home";
import CreateClass from "./component/CreateClass";
import Privateroute from "./PrivateRoute";
import JoinClass from "./component/JoinClass";
function App() {
  return (
    <BrowserRouter>
    <Privateroute path="/" exact component={HomePage}/>;
    <Route path="/login" exact component={LogIn}/>;
    <Route path="/signup" exact component={SignUp}/>;
    <Privateroute path="/update-profile" exact component={UpdateProfile}/>;
    <Privateroute path="/createClass" exact component={CreateClass}/>;
    <Privateroute path="/joinClass" exact component={JoinClass}/>;
    </BrowserRouter>
    
  );
}

export default App;
