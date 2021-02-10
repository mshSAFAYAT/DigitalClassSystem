import React from "react";
import {Link } from "react-router-dom";

const CreateClassDetails = (props) => {
 console.log(props.location.aboutProps)
  return (
    <div>
      <div className="col s12 m7">
        <div className="card ">
        <div className="card-image" style={{ marginBottom: 5 }}>
          <img
            src="https://picsum.photos/200/300"
            style={{ width: 188, height: 120 }} alt=""
          />
        </div>
          <span className="card-title">Class {props.location.aboutProps.name.ClassName}</span>
          <div className="card-content">Class Code: {props.location.aboutProps.name.ClassCode}</div>
          <div className="card-action">
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