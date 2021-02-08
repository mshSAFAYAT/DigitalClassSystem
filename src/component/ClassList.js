import React from "react";
import Class from "./Class";

const ClassList = (props) => {
    //console.log(props);
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          
          {       
              props.classes.map((book, i) => {
            return <Class data={book} key={i} />
             })
             }
        </div>
      </div>
    </div>
  );
};

export default ClassList;