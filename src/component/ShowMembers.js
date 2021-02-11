import React, { useState,useEffect } from "react";
import { db } from "./../firebase";
import Attendance from "./Attendance";
import MemberCard from "./MemberCard";

const ShowMembers = (props) => {
    console.log(props.location.state)
    console.log(props.location.state.attendance)
    let count=0;
    let[members,setMembers]=useState([])
    const [reload,setReload]=useState(false);
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
             // console.log(allMembers)
            let member=allMembers.filter(c=>c.data.ClassId==props.location.state.name.classId && c.data.ClassId!=undefined)
              setMembers(member)
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
    return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {
            
        
              members.map((book, i) => {
                  count++;
                  //console.log(book)
                  return props.location.state.attendance ? (
                    <Attendance data={book} key={i} count={count} />
                ) : ( 
                    <MemberCard data={book} key={i} count={count} />
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