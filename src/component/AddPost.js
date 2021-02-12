import React, { useState } from "react";
import { useRef } from "react";
import { input, Button, Card, Form, Alert, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db } from "./../firebase";
import * as admin from 'firebase-admin'
import moment from "moment";
import { BrowserRouter, Link, Switch, useHistory } from "react-router-dom";
function CurrentDate() {
    var date = new moment().format("DD/MM/YYYY");
    return date;
}

const AddPost = (props) => {
    console.log(props);
   // const [clId,setClId]=useState("")
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
                    postOwner: currentUser.displayName,
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
            console.log(Post)
        }
        else {
            alert("Input Field Empty");
        }
    }

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