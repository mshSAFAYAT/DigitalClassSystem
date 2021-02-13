import React, {useState} from "react";
import {Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddPost from "./AddPost";
import PostCard from "./PostCard";

const CreateClassDetails = (props) => {
  console.log(props.location)
  // const [C, setC] = useState("");
   console.log(props.location);
  const c=props.location.state.C
  return (
    <div>
      <div className="col s12 m7">
      <div className="card" style={{ marginTop: 10, marginLeft: 50, marginRight: 50, borderColor: "skyblue" }}>
      <div style={{ alignSelf: "center" }}>
        <div className="card-image" style={{ marginBottom: 5,padding:16 }}>
        {(props.location.state.name.classImgURL== null)?(<img
            src="https://picsum.photos/200/300"
            style={{width: 300, height: 220 }} alt=""
          />):(<img
            src={props.location.state.name.classImgURL}
            style={{width: 300, height: 220 }} alt=""
          />)}
        </div>
          <span className="card-title"> Class {props.location.state.name.ClassName}</span>
          <div className="card-content">Class Code: {props.location.state.name.ClassCode}</div>
          <Link
              to={{
                pathname:'/members',
                state:{
                  //props.data.data,
                  name:props.location.state,
                  attendance:false,
                  c:c,
                }
              }} className="btn btn-primary "
            >
              See Class Members
            </Link>
            {(c=="Create")?(
              <Link
                      to={{
                        pathname:'/members',
                        state:{
                          //props.data.data,
                          name:props.location.state,
                          attendance:true,
                          c:c,
                        }
                      }} className="btn btn-primary "
                    >
                     Take Attendance            </Link>

                    ):("")}
        
          <div className="card-action">
        <AddPost data={props.location.state}/> 
        <PostCard data={props.location.state}/>        
        <Link
              to='/' className="btn btn-primary w-100 mt-2"
            >
              See Class Details
            </Link>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};
export default CreateClassDetails;