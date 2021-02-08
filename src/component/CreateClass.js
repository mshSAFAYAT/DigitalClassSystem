import React, { useState,useEffect } from "react";
import { useRef } from "react";
import {Button,Card,Form,Alert, Container} from "react-bootstrap";
import {useAuth } from "../context/AuthContext";
import {BrowserRouter,Link,Switch, useHistory} from "react-router-dom";
import { db } from "./../firebase";

const CreateClass =()=>{
    const classnameRef = useRef();
    const codeRef = useRef();
    const descriptionRef = useRef("");
    const userRef = useRef();

    const {currentUser} = useAuth();
    const history =useHistory();

    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);

    const loadClasses =async(e)=>{
        e.preventDefault();

        db.collection("Classes").add({
            ClassName: classnameRef.current.value,
            ClassCode: codeRef.current.value,
            ClassOwner: currentUser.uid,
            ClassDescription: descriptionRef.current.value,
            members:[],
        }).then(()=>{
            alert("Class created");
        })
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();

    //     if(passwordRef.current.value !== confirmPasswordRef.current.value){
    //       return  setError("Passwords do not match!");
    //     }
        
    //         setLoading(true);
    //         setError("");
    //         const promises =[];
    //         if(emailRef.current.value !== currentUser.email ){
    //             promises.push(updateEmail(emailRef.current.value))
    //         }
    //         if(emailRef.current.value)
    //         {
    //             promises.push(updatePassword(passwordRef.current.value))
    //         }
    //         Promise.all(promises)
    //         .then(()=>
    //         {
    //             history.push("/");
    //         })
    //         .catch((error)=>
    //         {
    //             setError(error)
    //         })
    //         .finally(()=>{
    //             setLoading(false);
    //         })
     };
    
    return(
        <Container className='d-flex align-items-center justify-content-center'
        style={{minHeight:"100vh"}}>
        <div className='w-100' style={{maxWidth:"400px"}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>  Create Class</h2>
                    <h3 className='text-center mb-4'> { currentUser && currentUser.uid} </h3>
                    {error?(
                    <Alert variant="danger">{JSON.stringify(error)}</Alert>

                    ):("")}
                    <Form onSubmit={loadClasses}>
                        <Form.Group id ="name">
                            <Form.Label>Class Name</Form.Label>
                            <Form.Control ref={classnameRef} type="text" required ></Form.Control>
                        </Form.Group>
                        <Form.Group id ="classcode">
                            <Form.Label>Class Code</Form.Label>
                            <Form.Control ref={codeRef} type="code" required ></Form.Control>
                        </Form.Group>
                        <Form.Group id ="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control ref={descriptionRef} type="text" placeholder="leave blank to keep same"></Form.Control>
                        </Form.Group>
                        
                        <Button disabled={loading} classname="w-100" type="submit">Create</Button>
                    </Form>
                    <div className="w-100 text-center mt-2"><Link to="/">Cancel</Link></div>
                </Card.Body>
            </Card>
        </div>
        </Container>
    )
}
export default CreateClass;