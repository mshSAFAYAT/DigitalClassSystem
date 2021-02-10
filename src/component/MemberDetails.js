import React from "react";
import {Link } from "react-router-dom";

const MemberDetails = (props) => {
 console.log(props.pathname)
  return (
    <div>
      <div className="col s12 m4">
        <div className="card">
        <div className="card-image" style={{ marginBottom: 5 }}>
          <img
            src="https://picsum.photos/200/300"
            style={{ width: 188, height: 120 }} alt=""
          />
        </div>
          {/* <span className="card-title">Class {props.data.data.ClassName}</span>
          <div className="card-content">{props.data.data.ClassCode}</div>
          <div className="card-action">
     
          
            </div> */}
        </div>
      </div>
    </div>
  );
};
export default MemberDetails;