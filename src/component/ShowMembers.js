import React, { useState,useEffect } from "react";
import { db } from "./../firebase";
import MemberCard from "./MemberCard";

const ShowMembers = (props) => {
    console.log(props.location.aboutProps)
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
              setMembers(allMembers)
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
                  console.log(book)
                 return <MemberCard data={book} key={i} count={count} />
            // return <Book data={book} key={i} />
             
          })
          }
        </div>
      </div>
    </div>
  );
};

export default ShowMembers;