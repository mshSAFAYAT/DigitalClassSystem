import React,{useState} from "react";
import {Button,Card,Alert, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

const MemberCard=(props)=>{
     //console.log(props.count);
     const [details,setDetails]=useState(false);

return(
    <Card style={{borderRadius:10,shadowColor:'blue', shadowOffset:10, marginTop:5,marginLeft:5,marginRight:5}} onClick={function (){
  }} >
        {/* {details?(<MemberDetails/>):("")}
        {setDetails(false)} */}
        {/* <Card.Title title={"m"} subtitle=' commented on your post'  >
          Member:            Emails </Card.Title> */}
          {console.log(props.data.data)}
          <Link
to={{
pathname: "/memberDetails",
userProps: {name: props.data.data.ClassMemberMail,
memId:props.data.data.ClassMemberID},
}}>
<h4>{props.count} . {props.data.data.ClassMemberMail}</h4></Link>  
  
    </Card>
)
}

export default MemberCard;