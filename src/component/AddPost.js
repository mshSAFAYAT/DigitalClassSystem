import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { input, Button, Card, Form, Alert, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db } from "./../firebase";
import moment from "moment";
import {  useHistory } from "react-router-dom";
function CurrentDate() {
    var date = new moment().format("DD/MM/YYYY");
    return date;
}

const AddPost = (props) => {
    //console.log(props);
    let[member,setMember]=useState([])
    let[memberMail,setMemberMail]=useState("")
    const getMemberName=async()=>{
         db.collection("Users").doc(currentUser.uid).get()
         .then((doc)=>
         { 
            setMember(doc.data().Name)
            setMemberMail(doc.data().Email)
           // console.log(doc.data())
         })                  
      } 
          let clId ="";
    if(props.data.C == "Join"){
        console.log(props.data.name.ClassId)
         clId=props.data.name.ClassId;
    }
    else {
        console.log(props.data.classId)

         clId=props.data.classId;
    }
    const [loading, setLoading] = useState(false);
    const input = React.createRef();
    const Post = useRef("");
    const history = useHistory();
    const { updateEmail, updatePassword, currentUser } = useAuth();
    const handlePost = (e) => {
        console.log("Bari kha")
        e.preventDefault();
        if (Post.current.value.length > 0) {
            db
                .collection("posts")
                .add({
                    post: Post.current.value,
                    postOwner: member,
                    postOwnerEmail:memberMail,
                    postOwnerId: currentUser.uid,
                    classId: clId,
                    //creatTime: db.Timestamp.now(),
                    comments: []
                }).then((docRef) => {
                    alert("Post ID: " + docRef.id);
                })
                .catch((error) => {
                    alert(error);
                });
            Post.current.value="";
            //input.current.clear();
            //console.log(Post)
        }
        else {
            alert("Input Field Empty");
        }
    }
    useEffect(()=>{
        getMemberName();
       
      },[])
    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Write a Post" ref={Post}

                    // onChangeText={
                    //     function (currentPost) {

                    //     }
                    // }
                    />
                </Form.Group>
                <Button variant="Link" type="submit"  
                    onClick={handlePost}>
                    Post
                </Button>
            </Form>
        </div>
    )
}

export default AddPost;