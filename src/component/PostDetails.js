import React from "react";
import {Link } from "react-router-dom";

const PostDetails = (props) => {
 // console.log(props.data)
 //console.log(props.data.data.ClassName)
  return (
    <div>
      <div className="col s12 m9">
        <div className="card">
      
          <span className="card-title" style={{fontSize:22,paddingLeft:5,color:"blue"}}>  {props.data.data.postOwner}</span>
          <span className="card-subtitle" style={{fontSize:16,paddingTop:1,paddingLeft:5}}> {props.data.data.postOwnerEmail}</span>
          
          <div className="card-action">
          <div className="card-content" style={{paddingTop:1}}>{props.data.data.post}</div>
     
          {/* <Button disabled={loading} onClick={seeDetails} classname="w-100" type="submit">Details</Button> */}
      
            </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetails;