import React from "react";
import Class from "./Class";
import {useAuth} from "./../context/AuthContext";

const ClassList = (props) => {
    const {currentUser,logout} = useAuth();
    //console.log(props);
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          
          {       
              props.classes.map((book, i) => {
                //   console.log(book.data.ClassOwner)
                //   console.log(currentUser.uid)
                  if(book.data.ClassOwner==currentUser.uid)
                  {
                    return <Class data={book} key={i} />
                  }
             })
             }
        </div>
      </div>
    </div>
  );
};

export default ClassList;