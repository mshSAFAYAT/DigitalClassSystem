import React,{useState} from "react";
import {Button,Card,Alert, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

const Attendance=(props)=>{
     console.log(props);
     const [details,setDetails]=useState(false);
     const takePresent =async(e)=>{
        e.preventDefault();

    };

return(
    <Card style={{borderRadius:7,shadowColor:'blue', shadowOffset:10, marginTop:5,marginLeft:5,marginRight:5,padding:10}} onClick={function (){
  }} >
        {/* {details?(<MemberDetails/>):("")}
        {setDetails(false)} */}
        {/* <Card.Title title={"m"} subtitle=' commented on your post'  >
          Member:            Emails </Card.Title> */}
          {console.log(props.data.data)}
          <div className=" row"  > 
          <h5>{props.count} . {props.data.data.ClassMemberMail}</h5>  
         <div className="align-right"> <Button variant="Link"  onClick={takePresent}  classname="w-100" type="submit">Present</Button>
          <Button variant="Link"  onClick={takePresent}  classname="w-100" type="submit">Absent</Button>
          </div></div>
    </Card>
)
}

export default Attendance;