import React from "react";
import {Link } from "react-router-dom";
import NewPost from "./NewPost";

const CreateClassDetails = (props) => {
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
          <span className="card-title"> Class {props.location.state.name.ClassName}</span>
          <div className="card-content">Class Code: {props.location.state.name.ClassCode}</div>
          <Link
              to={{
                pathname:'/members',
                state:{
                  //props.data.data,
                  name:props.location.state,

                }
              }} className="btn btn-primary w-100 mt-2"
            >
              See Class Members
            </Link>
            <Link
              to={{
                pathname:'/members',
                state:{
                  //props.data.data,
                  name:props.location.state,
                  attendance:true,
                }
              }} className="btn btn-primary w-100 mt-2"
            >
             Take Attendance            </Link>
          <div className="card-action">
            {/* <NewPost/> */}
          <Link
              to='/' className="btn btn-primary w-100 mt-2"
            >
              See Class Details
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};
export default CreateClassDetails;