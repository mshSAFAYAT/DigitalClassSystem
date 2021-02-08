import React, { useState } from "react";
import { useRef } from "react";
import {Button,Card,Form,Alert, Container} from "react-bootstrap";
import {useAuth} from "../context/AuthContext";
import {BrowserRouter,Link,Switch, useHistory} from "react-router-dom";

const JoinClass =()=>{
    const classnameRef = useRef();
    const codeRef = useRef();
    const descriptionRef = useRef();

    const confirmPasswordRef = useRef();
    const {updateEmail,updatePassword,currentUser} = useAuth();
    const history =useHistory();

    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleJoin = async(e)=>{
            history.push("/");

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
                    {error?(
                    <Alert variant="danger">{JSON.stringify(error)}</Alert>

                    ):("")}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id ="classcode">
                            <Form.Label>Enter Class Code </Form.Label>
                            <Form.Control ref={codeRef} type="code" required ></Form.Control>
                        </Form.Group>                       
                        <Button variant="Link" onClick={handleJoin} disabled={loading} classname="w-100" type="submit">Join</Button>
                        <Button disabled={loading} classname="w-100" type="submit">Join</Button>
                    </Form>
                    <div className="w-100 text-center mt-2"><Link to="/">Cancel</Link></div>
                </Card.Body>
            </Card>
        </div>
        </Container>
    )
}
export default JoinClass;