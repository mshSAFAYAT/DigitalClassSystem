import React from "react";
import SignUp from "./component/SignUp";
import LogIn from "./component/LogIn";
import {BrowserRouter,Link,Route,Switch} from "react-router-dom";
import UpdateProfile from './component/UpdateProfile';
import HomePage from  "./component/Home";
import CreateClass from "./component/CreateClass";
import Privateroute from "./PrivateRoute";
import JoinClass from "./component/JoinClass";
import HeadBar from "./component/NavBar";
import HeadBarL from "./component/NavBarL";
import { useAuth } from "./context/AuthContext";
import CreateClassDetails from "./component/CreateClassDetails";
import ShowMembers from "./component/ShowMembers";
import MemberDetails from "./component/MemberDetails";
import Attendance from "./component/Attendance";
import UserProfile from "./component/UserProfile";

function App() {
  const { currentUser } = useAuth([]);
  return (
    <BrowserRouter>
    <div>
        {currentUser ? (
          <HeadBar />) : (<HeadBarL />)
        }</div>
    <Privateroute path="/" exact component={HomePage}/>;
    <Route path="/login" exact component={LogIn}/>;
    <Route path="/signup" exact component={SignUp}/>;
    <Privateroute path="/update-profile" exact component={UpdateProfile}/>;
    <Privateroute path="/userProfile" exact component={UserProfile} />;
    <Privateroute path="/createClass" exact component={CreateClass}/>;
    <Privateroute path="/joinClass" exact component={JoinClass}/>;
    <Privateroute path="/createClassDetails" exact component={CreateClassDetails}/>;
    <Privateroute path="/members" exact component={ShowMembers}/>;
    <Privateroute path="/memberDetails" exact component={MemberDetails}/>;
    <Privateroute path="/attendance" exact component={Attendance}/>;
    </BrowserRouter>
    
  );
}

export default App;
