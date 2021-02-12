import React from "react";
import {Link } from "react-router-dom";

const Class = (props) => {
 // console.log(props)
 //console.log(props.data.data.ClassName)
  return (
    <div>
      <div className="col s12 m4">
        <div className="card">
        <div className="card-image" style={{ marginBottom: 5 }}>
          <img
            src="https://picsum.photos/200/300"
            style={{width: 200, height: 120 }} alt=""
          />
        </div>
          <span className="card-title">Class {props.data.data.ClassName}</span>
          <div className="card-content">{props.data.data.ClassCode}</div>
          <div className="card-action">
     
          {/* <Button disabled={loading} onClick={seeDetails} classname="w-100" type="submit">Details</Button> */}
          <Link
              to={{
                pathname:'/createClassDetails',
                state:{
                  //props.data.data,
                  name:props.data.data,
                  classId:props.data.id,
                  C:props.C,
                }
              }} className="btn btn-primary w-100 mt-2"
              style={{fontSize:11}}
            >
             See Class Details
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Class;