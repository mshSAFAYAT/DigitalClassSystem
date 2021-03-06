import React, { useState } from "react";
import { useRef } from "react";
import {Button,Card,Form,Alert, Container} from "react-bootstrap";
import {useAuth} from "../context/AuthContext";
import {BrowserRouter,Link,Switch, useHistory} from "react-router-dom";
import { db } from "./../firebase";
import * as admin from 'firebase-admin';

const JoinClass =()=>{
    const [JoiningClassId,setJClass] = useState("");
    const [JoiningClassName,setJClassName] = useState("");

    const [classOwner,setclassOwner] = useState("");
    const codeRef = useRef();
    const {currentUser} = useAuth();
    const history =useHistory();

    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    let JClass =[];
    //console.log(db);
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
            if(allClasses!=null){
                 let JVClass=allClasses.filter(c=>c.data.ClassCode==codeRef.current.value )
                 console.log(JVClass.length)
                 //let CLID =JVClass[0].id
                 if(JVClass.length<=0 )
                 {
                     alert("No Class with this code ");
                    console.log("no class");
                 }
                 else{
                    console.log(JVClass[0].data)
                    let CLID =JVClass[0].id
                    db.collection("JoinedClasses").where("ClassMemberID", "==", currentUser.uid ).where( "ClassId", "==", CLID)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((docRef) => {
                        JClass.push({
                              id:docRef.id,
                            data:docRef.data(),
                                  });
                          // doc.data() is never undefined for query doc snapshots
                      
                        //   else if( docRef.data().attendanceStatus == 0){
                        //     ;               
                        //   }
                      }); 
                      console.log(JClass)
                     if( JClass.length >0){
                         alert("Already Joined in This Class ");
                         }   
                       else{
     // JClass=JVClass.filter(c=>c.data.ClassCode==codeRef.current.value && c.data.ClassCode==codeRef.current.value)
                    setJClass(JVClass[0].id)
                    //setJClassName(JClass[0].data.ClassName)
                    //console.log(JClass[0].data.ClassName)
                    setclassOwner(JVClass[0].data.ClassOwner)
                    db.collection("JoinedClasses").add({
                        ClassId: JVClass[0].id,
                        ClassName: JVClass[0].data.ClassName,
                        ClassCode: codeRef.current.value,
                        ClassMemberID: currentUser.uid,
                        ClassMemberName: currentUser.displayName,
                        ClassMemberMail: currentUser.email,
                        ClassOwnerID: JVClass[0].data.ClassOwner,
                        classImgURL: JVClass[0].data.classImgURL,
                    }).then(()=>{

                        alert("Joined in class");
                        history.push("/");
                    })
                       }  
                    })
               
                 }
                //console.log(currentUser.displayName)
            }
            else console.log("no class")
        },(error)=>{
            console.log(error);
        });
      

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