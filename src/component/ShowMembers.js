import React, { useState,useEffect,useRef } from "react";
import {Button,Card,Form} from "react-bootstrap";
import { db } from "./../firebase";
import Attendance from "./Attendance";
import MemberCard from "./MemberCard";

const ShowMembers = (props) => {
    console.log(props.location.state)
    console.log(props.location.state.c)
    let count=0;
    let[members,setMembers]=useState([])
    const classNoRef = useRef("");
    let [classNo,setClassN] = useState("null")
   // let classNo = "null";
    const [reload,setReload]=useState(false);
    const setClassNo=async()=>{
      //classNo=classNoRef.current.value;
      setClassN(classNoRef.current.value)
      console.log(classNo)
    }
    const getMembers=async()=>{
      setReload(true)
       db.collection("JoinedClasses")
      .onSnapshot((querySnapshot)=>{
          let allMembers=[]
          querySnapshot.forEach((doc)=>{
              allMembers.push({
                  id:doc.id,
                  data:doc.data(),
              });
          });
          if(allMembers!=null){
              console.log(allMembers)
            if(props.location.state.c == "Join")
            {
              let member=allMembers.filter(c=>c.data.ClassId==props.location.state.name.name.ClassId && c.data.ClassId!=undefined)
              setMembers(member)
            }
            else{
              let member=allMembers.filter(c=>c.data.ClassId==props.location.state.name.classId && c.data.ClassId!=undefined)
              setMembers(member)
            }
           
          }
          else console.log("no Member")
          setReload(false)
      },(error)=>{
          setReload(false);
          console.log(error);
      });
    } 

    useEffect(()=>{
      getMembers()
    },[])
    console.log(members);
    console.log(classNoRef.current)
    return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          { 
            props.location.state.attendance ? (
             
              <Card>      <h7>Enter Class No </h7>        <input type="code" ref={classNoRef} onChange={setClassNo}></input>
             {console.log(classNo)}
             <h7>{classNo}</h7>
              </Card>
          ) : ( 
      "")
          }
        
          {/* {(classNo!=Null)} */}
          {
            

              members.map((book, i) => {
                  count++;
                  //console.log(book)
                  return props.location.state.attendance ? (
                    <div>      {(classNo!="null")?(<Attendance data={book} key={i} count={count} classNo={classNo} />):("")}              
                    </div>
                ) : ( 
            <MemberCard data={book} key={i} count={count} c={props.location.state.c} />
                );
                // return <MemberCard data={book} key={i} count={count} />
            // return <Book data={book} key={i} />
             
          })
          }
        </div>
      </div>
    </div>
  );
};

export default ShowMembers;