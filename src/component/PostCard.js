import React, { useState,useEffect } from "react";
import { useRef } from "react";
import { input, Button, Card,Text, Form, Alert, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import * as admin from 'firebase-admin'
import moment from "moment";
import { BrowserRouter, Link, Switch, useHistory } from "react-router-dom";
import PostDetails from "./PostDetails";

 const PostCard = (props) =>{
     console.log(props)
    let[posts,setpost]=useState([]) 
    const getPosts=async()=>{
         db.collection("posts")
        .onSnapshot((querySnapshot)=>{
            let allPosts=[]
            querySnapshot.forEach((doc)=>{
                allPosts.push({
                    id:doc.id,
                    data:doc.data(),
                });
            });
            if(allPosts!=null){
                console.log(allPosts)
                if(props.data.C == "Create"){
                  let post=allPosts.filter(c=>c.data.classId==props.data.classId && c.data.classId!=undefined)
                  setpost(post)
                }
                else if (props.data.C == "Join"){
                  let post=allPosts.filter(c=>c.data.classId==props.data.name.ClassId && c.data.classId!=undefined)
                  setpost(post)
                }
             
            }
            else console.log("no Member")
        },(error)=>{
            console.log(error);
        });
      }; 
  
      useEffect(()=>{
        getPosts()
      },[]);
      console.log(posts);

     return(
        //  <Card >
            <div className="container">
      <div className="row">
        <div className="col s12">
          {
            
        
              posts.map((book, i) => {
                  console.log(book)
                  return <PostDetails data={book} key={i} />
             
          })
          }
        </div>
      </div>
    </div>
           
                
        
        //  </Card>
     )
 }

 export default PostCard;