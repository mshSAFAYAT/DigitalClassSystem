import React,{useState} from "react";
import {Button,Card,Alert, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import {useAuth } from "../context/AuthContext";
import { db } from "./../firebase";

const Attendance=(props)=>{
     console.log(props);
     const {currentUser} = useAuth();
     const [details,setDetails]=useState(false);
     const getAttendance = async()=>{
        console.log("in")
        let allAttendance=[]
          db.collection("attendance").where("studentId", "==", props.data.data.ClassMemberID ).where( "classId", "==", props.data.data.ClassId).where( "ClassNo", "==", props.classNo)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((docRef) => {
              allAttendance.push({
                    id:docRef.id,
                  data:docRef.data(),
                        });
            });
            if(allAttendance.length>0)
            {
                 alert("Already taken");
               }
            else{
                alert("Not taken");

            }        
        })
 
      }
    const takePresent =async(e)=>{
        e.preventDefault();
        let allAttendance=[]
        db.collection("attendance").where("studentId", "==", props.data.data.ClassMemberID ).where( "classId", "==", props.data.data.ClassId).where( "ClassNo", "==", props.classNo)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((docRef) => {
            allAttendance.push({
                  id:docRef.id,
                data:docRef.data(),
                      });
          });
          if(allAttendance.length>0)
          {
               alert("Already taken");
             }
          else{
            db
            .collection("attendance")
            .add({
                classId:props.data.data.ClassId,
                className : props.data.data.ClassName,
                studentId    : props.data.data.ClassMemberID,
                studentName    : props.data.data.ClassMemberName,
                TeacherId: props.data.data.ClassOwnerID,
                TeacherName: currentUser.displayName,
                attendanceStatus: 1,
                ClassNo: props.classNo,
                //creatTime: db.Timestamp.now(),
            }).then((docRef) => {
               // alert("attendance ID: " + docRef.id);
            })
            .catch((error) => {
                alert(error);
            });
          }        
      })
       
    };
    const takeAbsent =async(e)=>{
        e.preventDefault();
        let allAttendance=[]
        db.collection("attendance").where("studentId", "==", props.data.data.ClassMemberID ).where( "classId", "==", props.data.data.ClassId).where( "ClassNo", "==", props.classNo)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((docRef) => {
            allAttendance.push({
                  id:docRef.id,
                data:docRef.data(),
                      });
          });
          if(allAttendance.length>0)
          {
               alert("Already taken");
             }
          else{
            db
            .collection("attendance")
            .add({
                classId:props.data.data.ClassId,
                className : props.data.data.ClassName,
                studentId    : props.data.data.ClassMemberID,
                studentName    : props.data.data.ClassMemberName,
                studentMail    : props.data.data.ClassMemberMail,
                TeacherId: props.data.data.ClassOwnerID,
                TeacherName: currentUser.displayName,
                attendanceStatus: 0,
                ClassNo: props.classNo,
                //creatTime: db.Timestamp.now(),
            }).then((docRef) => {
               // alert("attendance ID: " + docRef.id);
            })
            .catch((error) => {
                alert(error);
            });
          }        
      })
       
    };


return(
    <Card style={{borderRadius:7,shadowColor:'blue', shadowOffset:10, marginTop:5,marginLeft:5,marginRight:5,padding:10}} onClick={function (){
  }} >
        {/* {details?(<MemberDetails/>):("")}
        {setDetails(false)} */}
        {/* <Card.Title title={"m"} subtitle=' commented on your post'  >
          Member:            Emails </Card.Title> */}
          {/* {console.log(props.data.data)} */}
          <div className=" row"  > 
          <h5>{props.count} . {props.data.data.ClassMemberMail} </h5>  
         <div className=""> <Button variant="Link"  onClick={takePresent}   type="submit">Present</Button> 
          <Button variant="Link"  onClick={takeAbsent}  classname="w-100" type="submit">Absent</Button>
          </div></div>
    </Card>
)
}

export default Attendance;