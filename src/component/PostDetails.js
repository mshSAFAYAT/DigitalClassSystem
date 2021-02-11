import React from "react";
import {Link } from "react-router-dom";

const PostDetails = (props) => {
  console.log(props.data)
 //console.log(props.data.data.ClassName)
  return (
    <div>
      <div className="col s12 m9">
        <div className="card">
      
          <span className="card-title"> {props.data.data.postOwner}</span>
          <div className="card-content">{props.data.data.post}</div>
          <div className="card-action">
     
          {/* <Button disabled={loading} onClick={seeDetails} classname="w-100" type="submit">Details</Button> */}
      
            </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetails;