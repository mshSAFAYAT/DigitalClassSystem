import React, { useState } from "react";
import { useRef } from "react";
import {Button,Card,Form,Alert, Container} from "react-bootstrap";
import {useAuth} from "../context/AuthContext";
import {BrowserRouter,Link,Switch, useHistory} from "react-router-dom";
import { db } from "./../firebase";

const JoinClass =()=>{
    const [JoiningClass,setJClass] = useState(false);
    const codeRef = useRef();
    const {updateEmail,updatePassword,currentUser} = useAuth();
    const history =useHistory();

    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    let JClass =[];

    const handleJoin = async(e)=>{
        db.collection("Classes")
        // .doc(codeRef)
        .onSnapshot((querySnapshot)=>{
            let allClasses=[]
            querySnapshot.forEach((docRef)=>{
                //console.log(docRef.data())
                allClasses.push({
                    id:docRef.id,
                    data:docRef.data(),
                });
            });
            //console.log(codeRef.current.value)
            if(allClasses!=null){
                 JClass=allClasses.filter(c=>c.data.ClassCode==codeRef.current.value )
                setJClass(JClass)
                console.log(JClass[0].id)
            }
            else console.log("no class")
        },(error)=>{
            console.log(error);
        });
        //let jid=JClass[0].id;
        // db.collection("Classes").doc(
        //     "FQJC3eI7feYYI7o3rvzY"
        //     ).update({
        //     members: db.FieldValue.arrayUnion(currentUser.uid),
        // }).then(()=>{
        //     alert("Joind in class " );
        // })
        //     history.push("/");

    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
              
     };

    return(
        <Container className='d-flex align-items-center justify-content-center'
        style={{minHeight:"100vh"}}>
        <div className='w-100' style={{maxWidth:"400px"}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>  Join Class</h2>
                    {error?(
                    <Alert variant="danger">{JSON.stringify(error)}</Alert>

                    ):("")}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id ="classcode">
                            <Form.Label>Enter Class Code </Form.Label>
                            <Form.Control ref={codeRef} type="code" required ></Form.Control>
                        </Form.Group>                       
                        <Button variant="Link" onClick={handleJoin} disabled={loading} classname="w-100" type="submit">Join</Button>
                        {/* <Button disabled={loading} classname="w-100" type="submit">Join</Button> */}
                    </Form>
                    <div className="w-100 text-center mt-2"><Link to="/">Cancel</Link></div>
                </Card.Body>
            </Card>
        </div>
        </Container>
    )
}
export default JoinClass;