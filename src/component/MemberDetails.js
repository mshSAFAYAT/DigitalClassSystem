import React, { useState, useEffect, useRef, PureComponent } from "react";
import { db } from "./../firebase"; import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { Button } from "react-bootstrap";
import jsPDF from "jspdf"


const MemberDetails = (props) => {
        let location = useLocation();
        console.log(location.state);
        let[member,setMember]=useState([])
        let[memberMail,setMemberMail]=useState("")
        let[memberPhone,setMemberPhone]=useState("")
        //const presentRef = useRef(0);
        const [present,setPresent]=useState(0)
        let totalpresent =0;
        let totalabsent =0;
        const [totalClasses,setTClasses]=useState(0)
        const [absent,setAbsent]=useState(0)

        const [reload,setReload]=useState(false);
        let JClass =[];
        //console.log(db);
        const reportGenetion = async () => {
          const doc = new jsPDF();
          let percantage = (present/totalClasses)*100; 
          percantage = percantage.toFixed(2);
  
          if(percantage>75.00){
          doc.setFontSize(22);
          doc.text(75, 10, 'Class Report');
          doc.setFontSize(16);
          doc.text(20, 30, 'Hello ' + member + ",");
          doc.text(20, 40, 'Till now ' + totalClasses + " classes are held." + " You were absent in " + absent + " classes and present in ");
          doc.text(20, 50, present + " classes. Your attendance percentage is " + percantage + ".");
          doc.text(20, 60, "Good job. Keep it up.");
          doc.text(20, 70, "From, Course Teacher. " );}
          else{
          doc.setFontSize(22);
          doc.text(75, 10, 'Class Report');
          doc.setFontSize(16);
          doc.text(20, 30, 'Hello ' + member + ",");
          doc.text(20, 40, 'Till now ' + totalClasses + " classes are held." + " You were absent in " + absent + " classes and present in ");
          doc.text(20, 50, present + "classes. Your attendance percentage is " + percantage + ".");
          doc.text(20, 60, "Do attend you class regularly");
          doc.text(20, 70, "From, Course Teacher. " );
          }
          // Output as Data URI
          doc.save("Report.pdf")
  
      }
        const getAttendance = async()=>{
          console.log("in")
          let allAttendance=[]
            db.collection("attendance").where("studentId", "==", location.state.memId ).where( "classId", "==", location.state.clID)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((docRef) => {
                allAttendance.push({
                      id:docRef.id,
                    data:docRef.data(),
                          });
                  // doc.data() is never undefined for query doc snapshots
                  console.log(docRef.id, " => ", docRef.data().attendanceStatus);
                  if( docRef.data().attendanceStatus == 1){
                      totalpresent=totalpresent+1;               
                      //presentRef.current.value=present.current+1;
                  }
                  else if( docRef.data().attendanceStatus == 0){
                    totalabsent=totalabsent+1;               
                  }
              });
              console.log(totalpresent)
              setPresent(totalpresent);
              console.log(present);
              setAbsent(totalabsent)
              console.log(allAttendance.length)
              setTClasses(allAttendance.length)

          })
   
        }
        const getMember=async()=>{
          setReload(true)
           db.collection("Users").doc(location.state.memId).get()
           .then((doc)=>
           {
               setMember(doc.data().Name)
               setMemberMail(doc.data().Email)
               setMemberPhone(doc.data().Phone)
               console.log(doc.data())
           })
                    
        } 
    
        useEffect(()=>{
          getMember();
          getAttendance();
        },[])
//console.log(props.data)
  return (
    <div>
      <div className="col s12 m7">
        <div className="card " style={{ marginBottom: 5,margin:26 }}>
        <div className="card-image" style={{ marginBottom: 5,padding:26 }}>
          <img
            src="https://picsum.photos/200/300"
            style={{ width: 600, height: 180 }} alt=""
          />
        </div>
          <span className="card-title"> Student Name : {member}</span>
          

          <div className="card-action">
          <div className="card-content"> Email : {memberMail}</div>
          <div className="card-content"> Phone No : {memberPhone}</div>
          <div className="card-content">  Total Classes : {totalClasses}</div>

          <div className="card-content">  Total Present : {present}</div>
          <div className="card-content">  Total Absent : {absent}</div>

            </div>
          <Button onClick={reportGenetion}>
                            Create Report
                        </Button>
        </div>
      </div>
    </div>
  );
};
export default MemberDetails;