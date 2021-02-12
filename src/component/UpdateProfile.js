import React, { useState } from "react";
import { useRef } from "react";
import {Button,Card,Form,Alert, Container} from "react-bootstrap";
import {useAuth} from "../context/AuthContext";
import {Link,Switch, useHistory} from "react-router-dom";
import { db, storage } from "./../firebase";

const UpdateProfile =()=>{
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const confirmPasswordRef = useRef();
    const {updateEmail,updatePassword,currentUser} = useAuth();
    const history =useHistory();
    const [userImg, setUserImg] = useState(null);
    const types = ['image/png', 'image/jpeg']; // image types

    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    const userImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setUserImg(selectedFile);
            setError('')
        }
        else {
            setUserImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();

        // if(passwordRef.current.value !== confirmPasswordRef.current.value){
        //   return  setError("Passwords do not match!");
        // }
        const uploadTask = storage.ref(`user-images/${userImg.name}`).put(userImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('user-images').child(userImg.name).getDownloadURL().then(url => {
                    console.log(url)
                    db.collection('Users').doc(currentUser.uid )
                    .update({
                        ImgURL: url
                    }).then(() => {
                        setUserImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
            setLoading(true);
            setError("");
            const promises =[];
            if(emailRef.current.value !== currentUser.email ){
                promises.push(updateEmail(emailRef.current.value))
            }
            if(emailRef.current.value)
            {
                promises.push(updatePassword(passwordRef.current.value))
            }
            Promise.all(promises)
            .then(()=>
            {
                history.push("/");
            })
            .catch((error)=>
            {
                setError(error)
            })
            .finally(()=>{
                setLoading(false);
            })
            
  
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
                    <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" 
                    onChange={userImgHandler} />
                <br /> 
                        <Form.Group id ="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control ref={nameRef} type="text" ></Form.Control>
                        </Form.Group>
                        <Form.Group id ="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" required defaultValue={currentUser.email}></Form.Control>
                        </Form.Group>
                        <Form.Group id ="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="leave blank to keep same"></Form.Control>
                        </Form.Group>
                        <Form.Group id ="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control ref={confirmPasswordRef} type="password" placeholder="leave blank to keep same"></Form.Control>
                        </Form.Group> 
                        <Button disabled={loading} classname="w-100" type="submit">Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2"><Link to="/">Cancel</Link></div>
        </div>
        </Container>
    )
}
export default UpdateProfile;