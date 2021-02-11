import React, { useState,useEffect } from "react";
import { db } from "./../firebase";import {Link } from "react-router-dom";
import { useLocation} from "react-router-dom"


const MemberDetails = (props) => {
        let location = useLocation();
        console.log(location.userProps);
        let[member,setMember]=useState([])
        let[memberMail,setMemberMail]=useState("")
        let[memberPhone,setMemberPhone]=useState("")

        const [reload,setReload]=useState(false);
        const getMember=async()=>{
          setReload(true)
           db.collection("Users").doc(location.userProps.memId).get()
           .then((doc)=>
           {
               setMember(doc.data().Name)
               setMemberMail(doc.data().Email)
               setMemberPhone(doc.data().Phone)
               console.log(doc.data())
           })
          
           
        } 
    
        useEffect(()=>{
          getMember()
        },[])
 console.log(props.data)
  return (
    <div>
      <div className="col s12 m7">
        <div className="card " style={{ marginBottom: 5,margin:26 }}>
        <div className="card-image" style={{ marginBottom: 5,padding:26 }}>
          <img
            src="https://picsum.photos/200/300"
            style={{ width: 600, height: 180 }} alt=""
          />
        </div>
          <span className="card-title"> Student Name : {member}</span>
          

          <div className="card-action">
          <div className="card-content"> Email : {memberMail}</div>
          <div className="card-content"> Phone No : {memberPhone}</div>
      
            </div>
        </div>
      </div>
    </div>
  );
};
export default MemberDetails;