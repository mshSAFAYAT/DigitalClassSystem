import React from "react";
import {Link } from "react-router-dom";

const Class = (props) => {
 console.log(props.data.data)
  return (
    <div>
      <div className="col s12 m4">
        <div className="card">
          
          <span className="card-title">Class {props.data.data.ClassName}</span>
          <div className="card-content">{props.data.data.ClassCode}</div>
          <div className="card-action">
           
            </div>
        </div>
      </div>
    </div>
  );
};
export default Class;