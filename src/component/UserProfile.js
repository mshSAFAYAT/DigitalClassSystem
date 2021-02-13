import React, { useState, useEffect } from "react";
import { Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "./../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "./../firebase";
import ClassList from "./ClassList";
import "firebase/auth";
import * as firebase from "firebase";
const UserProfile = () => {
    const { currentUser, logout } = useAuth();

    let[member,setMember]=useState("")
    let[memberMail,setMemberMail]=useState("")
    let[memberPhone,setMemberPhone]=useState("") 
    // const getUserDetails=async()=>{
    //     db.collection("Users").doc(currentUser.uid).get()
    //        .then((doc)=>
    //        {
    //            setMember(doc.data().Name)
    //            setMemberMail(doc.data().Email)
    //            setMemberPhone(doc.data().Phone)
    //            console.log(doc.data())
    //        })

    //  }
     useEffect(()=>{
      //  getUserDetails();
      },[]);
    console.log(currentUser.photoURL)
    // let user = firebase.auth().currentUser;
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue" >
                {(currentUser.photoURL != null)?(<img
            src={currentUser.photoURL}
            style={{width: 200, height: 120 }} alt=""
          />):("")}
                    <div className="card-content white-text">
                        <span className="card-title ">My Profile</span>
                        <div><strong>Name: </strong>
                            {currentUser.displayName}</div>
                            <div>
                            <strong>Email: </strong>
                            {currentUser.email}</div>
                            <div>
                            <strong>Phone: </strong>
                            {memberPhone}</div>
                          
                    </div>
                    <div className="card-action">
                        <Link to='/update-profile'>Update Profile</Link>
                    </div>
                </div>
            </div>
        </div>

        // <div><strong>Name: </strong>
        //     { currentUser && currentUser.displayName}
        //     <strong>Email: </strong>
        //     { currentUser && currentUser.email}
        //     <strong>Phone: </strong>
        //     { currentUser && currentUser.phoneNumber}</div>

    )
}

export default UserProfile;