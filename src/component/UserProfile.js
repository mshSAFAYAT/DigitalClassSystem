import React, { useState, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth } from "./../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db, storage } from "./../firebase";
import "firebase/auth";
const UserProfile = () => {
    const { currentUser, logout } = useAuth();
    let nameRef =useRef("");
    let[member,setMember]=useState("")
    let[memberMail,setMemberMail]=useState("")
    let[memberPhone,setMemberPhone]=useState("") 
    // const [userImg, setUserImg] = useState(null);
    // const types = ['image/png', 'image/jpeg']; // image types
    // const [error, setError] = useState("");

    const getUserDetails=()=>{
        db.collection("Users").doc(currentUser.uid).get()
           .then((doc)=>
           {
            console.log(doc.data())
              // nameRef.current=doc.data.Name;
               setMember(doc.data().Name)
                setMemberMail(doc.data().Email)
               setMemberPhone(doc.data().Phone)
           })       
     }
    //  const userImgHandler = (e) => {
    //     let selectedFile = e.target.files[0];
    //     if (selectedFile && types.includes(selectedFile.type)) {
    //         setUserImg(selectedFile);
    //         setError('')
    //     }
    //     else {
    //         setUserImg(null);
    //         setError('Please select a valid image type (jpg or png)');
    //     }
    // }
     useEffect(()=>{
        getUserDetails();
      },[]);
    // console.log(currentUser.phoneNumber)
    // let user = firebase.auth().currentUser;
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue" >
                    <div className="card-content white-text">
                        <span className="card-title ">My Profile</span>
                        <div><strong>Name: </strong>
                            {member}</div>
                            <div>
                            <strong>Email: </strong>
                            {memberMail}</div>
                            <div>
                            <strong>Phone: </strong>
                            {memberPhone}</div>
                            {/* <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" 
                    onChange={userImgHandler} />
                <br /> */}
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