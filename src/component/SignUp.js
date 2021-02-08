import React, { useState } from "react";
import { useRef } from "react";
import {Button,Card,Form,Alert, Container} from "react-bootstrap";
import {useAuth} from "./../context/AuthContext";
import {BrowserRouter,Link,Switch,useHistory} from "react-router-dom";

const SignUp =()=>{
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const phoneRef = useRef();
    const {signup} = useAuth();

    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    const history  = useHistory();

    const handleSubmit =async(e)=>{
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value){
          return  setError("Passwords do not match!");
        }
        try{
            setLoading(true);
            setError("");
            await signup(emailRef.current.value, passwordRef.current.value,nameRef.current.value,phoneRef.current.value)
            history.push("/login");
        }catch(error){
            setError(error);
        }
        setLoading(false);
    };

    return(
        <Container className='d-flex align-items-center justify-content-center'
        style={{minHeight:"100vh"}}>
        <div className='w-100' style={{maxWidth:"400px"}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'> Sign Up</h2>
                    {error?(
                    <Alert variant="danger">{JSON.stringify(error)}</Alert>

                    ):("")}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id ="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control ref={nameRef} type="text" required></Form.Control>
                        </Form.Group>
                        <Form.Group id ="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" required></Form.Control>
                        </Form.Group>
                        <Form.Group id ="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" required></Form.Control>
                        </Form.Group>
                        <Form.Group id ="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control ref={confirmPasswordRef} type="password" required></Form.Control>
                        </Form.Group> 
                        <Form.Group id ="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control ref={phoneRef} type="phone" required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} classname="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">Already have an account? <Link to="/login">Log In!</Link></div>
        </div>
        </Container>
    )
}
export default SignUp;