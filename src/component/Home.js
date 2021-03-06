import React, { useState,useEffect } from "react";
import {Button,Card,Alert, Container} from "react-bootstrap";
import {useAuth} from "./../context/AuthContext";
import {Link,useHistory} from "react-router-dom";
import { db } from "./../firebase";
import ClassList from "./ClassList";

const HomePage =()=>{
    const [error,setError] = useState("");
    const [Classes,setClasses] = useState([]);
    const [JoinedClasses,setJoinedClasses] = useState([]);
    const {currentUser,logout} = useAuth();
    const history  = useHistory();
   
    const getClasses=async()=>{
       db.collection("Classes")
        .onSnapshot((querySnapshot)=>{
            let allClasses=[]
            querySnapshot.forEach((doc)=>{
                allClasses.push({
                    id:doc.id,
                    data:doc.data(),
                });
            });
            if(allClasses!=null){
                setClasses(allClasses)
            }
            else console.log("no Class")
        },(error)=>{
            console.log(error);
        });
    }
    const getJoinedClasses=async()=>{
        db.collection("JoinedClasses")
         .onSnapshot((querySnapshot)=>{
             let allJClasses=[]
             querySnapshot.forEach((doc)=>{
                 allJClasses.push({
                     id:doc.id,
                     data:doc.data(),
                 });
             });
             if(allJClasses!=null){
                 setJoinedClasses(allJClasses)
             }
             else console.log("no Joined Class")
         },(error)=>{
             console.log(error);
         });
     }
    useEffect(()=>{
        getClasses();
        getJoinedClasses()
      },[])
     console.log(currentUser);
      //console.log(Classes[0].data.ClassOwner);
    return(
        <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}>
        <div className="w-100" style={{maxWidth:"1000px"}}>
        
            <Card className="text-center mb-4" style={{backgroundColor:"white",paddingBlock:20,paddingTop:7}}>
                <Card.Body>
                    <div className="row"><h5 className="text-left mb-4" style={{paddingRight:100}}>Home</h5>
                    <h5 className="text-center mb-4">Welcome {currentUser.displayName}</h5></div>
                    
                    {error?
                    <Alert variant="danger">{JSON.stringify(error)}</Alert>
                    :""}
                    {/* <strong>Email: </strong>
                    { currentUser && currentUser.email} */}
                   
                    <strong style={{alignContent:"left"}}>Created Classes: </strong>
                 
             <ClassList classes={Classes} C={"Create"}/>
             <strong style={{alignContent:"left"}}>Joined Classes: </strong>
                 
                 <ClassList classes={JoinedClasses} C={"Join"}/>
                </Card.Body>
                {/* <Button variant="Link" onClick={handleLogout}>Log Out</Button> */}

            </Card>
            <div>
            </div>
        </div>
        </Container>
    )
}
export default HomePage;