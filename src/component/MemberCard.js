import React,{useState} from "react";
import {Button,Card} from "react-bootstrap";
import { Link } from "react-router-dom";

const MemberCard=(props)=>{
     console.log(props);
     const [details,setDetails]=useState(false);

return(
    <Card style={{borderRadius:10,shadowColor:'blue', shadowOffset:10, marginTop:5,marginLeft:5,marginRight:5}} onClick={function (){
  }} >
        {/* {details?(<MemberDetails/>):("")}
        {setDetails(false)} */}
        {/* <Card.Title title={"m"} subtitle=' commented on your post'  >
          Member:            Emails </Card.Title> */}
          {console.log(props.data.data)}
          {(props.c == "Create")?(       <Link
to={{
pathname: "/memberDetails",
state: {
  clID:props.data.data.ClassId,
  name: props.data.data.ClassMemberMail,
memId:props.data.data.ClassMemberID},

}}>
<h4>{props.count} . {props.data.data.ClassMemberMail}</h4></Link>  
  ):(<h4>{props.count} . {props.data.data.ClassMemberMail}</h4>)}
   
    </Card>
)
}

export default MemberCard;