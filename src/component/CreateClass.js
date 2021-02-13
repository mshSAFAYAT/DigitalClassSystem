import React, { useState,useEffect } from "react";
import { useRef } from "react";
import {Button,Card,Form,Alert, Container} from "react-bootstrap";
import {useAuth } from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import { db, storage } from "./../firebase";

const CreateClass =()=>{
    const classnameRef = useRef();
    const codeRef = useRef();
    const descriptionRef = useRef("");
    const userRef = useRef();
    const [classImg, setClassImg] = useState(null);
    const types = ['image/png', 'image/jpeg']; // image type
    const {currentUser} = useAuth();
    const history =useHistory();

    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    const classImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setClassImg(selectedFile);
            setError('')
        }
        else {
            setClassImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }
    const loadClasses =async(e)=>{
        e.preventDefault();
        if(classImg == null){
            db.collection("Classes").add({
                ClassName: classnameRef.current.value,
                ClassCode: codeRef.current.value,
                ClassOwner: currentUser.uid,
                ClassDescription: descriptionRef.current.value,
                classImgURL: null,
                members:[],
            }).then(()=>{
                alert("Class created");
                history.push("/");
            })
        }else{
            const uploadTask = storage.ref(`class-images/${classImg.name}`).put(classImg);
            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }, err => setError(err.message)
                , () => {
                    storage.ref('class-images').child(classImg.name).getDownloadURL().then(url => {
                        console.log(url)
                        db.collection("Classes").add({
                            ClassName: classnameRef.current.value,
                            ClassCode: codeRef.current.value,
                            ClassOwner: currentUser.uid,
                            ClassDescription: descriptionRef.current.value,
                            classImgURL: url,
                            members:[],
                        }).then(()=>{
                            setClassImg('');
                            setError('');
                            document.getElementById('file').value = '';
                            alert("Class created");
                            history.push("/");
                        }).catch(err => setError(err.message))
                       
                    })
                })
        }
        
      
    }
    
    return(
        <Container className='d-flex align-items-center justify-content-center'
        style={{minHeight:"100vh", paddingTop:2}}>
        <div className='w-100' style={{maxWidth:"400px"}}>
            <Card style={{}}>
                <Card.Body>
                    <h2 className='text-center mb-4'>  Create Class</h2>
                    <h3 className='text-center mb-4'> { currentUser && currentUser.email} </h3>
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
                        <label htmlFor="class-img">Class Image</label>
                <input type="file" className='form-control' id="file" 
                    onChange={classImgHandler} />
                <br />  
                        <Button disabled={loading} classname="w-100" type="submit">Create</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 "><Link className="btn btn-danger" to="/">Cancel</Link></div>

        </div>
        </Container>
    )
}
export default CreateClass;