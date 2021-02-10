import React,{useState} from "react";
import {Button,Card,Alert, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import MemberDetails from "./MemberDetails";

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
          {/* <Link to={{pathname:"/memberDetails", aboutProps:{
                  //props.data.data,
                  name:props.data.data,
                }
        
        }}><h4>{props.count} . {props.data.data.ClassMemberMail}</h4></Link> */}
            <Link
              to={{
                pathname:'/memberDetails',
               
                  volumeId:props.data.data,
                
              }}  className="btn btn-primary w-100 mt-2"
            >
<h4>{props.count} . {props.data.data.ClassMemberMail}</h4>            </Link>
  
    </Card>
)
}

export default MemberCard;