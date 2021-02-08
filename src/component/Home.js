import React, { useState,useEffect } from "react";
import {Button,Card,Alert, Container} from "react-bootstrap";
import {useAuth} from "./../context/AuthContext";
import {Link,useHistory} from "react-router-dom";
import { db } from "./../firebase";
import ClassList from "./ClassList";

const HomePage =()=>{
    const [error,setError] = useState("");
    const [Classes,setClasses] = useState([]);
    const {currentUser,logout} = useAuth();
    const history  = useHistory();
    const handleLogout = async () =>{
        setError("");
        try{
            await logout().then(() =>{
            history.push("./login");
            });
        }catch(error){
            setError(error);
        }
    };
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
    useEffect(()=>{
        getClasses()
      },[])
     console.log(Classes);
      //console.log(Classes[0].data.ClassOwner);
    return(
        <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}>
        <div className="w-100" style={{maxWidth:"700px"}}>
        
            <Card className="text-center mb-4" style={{backgroundColor:"skyblue",paddingBlock:20}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Home</h2>
                    {error?
                    <Alert variant="danger">{JSON.stringify(error)}</Alert>
                    :""}
                    <strong>Email: </strong>
                    { currentUser && currentUser.email}
                    <Link to= '/update-profile' className = "btn btn-primary w-100 mt-3" >Up Profile</Link>
                    <span>
                    <Link to= '/createClass' className = "btn btn-primary w-100 mt-3" >Create Class</Link>
                    <Link to= '/joinClass' className = "btn btn-primary w-100 mt-3" >Join Class</Link>
                    </span>
                    <strong style={{alignContent:"left"}}>Created Classes: </strong>
                 
        <ClassList classes={Classes}/>
                </Card.Body>
                <Button variant="Link" onClick={handleLogout}>Log Out</Button>

            </Card>
            <div>
            </div>
        </div>
        </Container>
    )
}
export default HomePage;