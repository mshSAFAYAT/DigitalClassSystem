import React from "react";
import Class from "./Class";
import {useAuth} from "./../context/AuthContext";

const ClassList = (props) => {
    const {currentUser,logout} = useAuth();
    //console.log(props.C);
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          
          {       
              props.classes.map((book, i) => {
                  // console.log(book.data)
                //   console.log(currentUser.uid)
                if(props.C==="Create"){
                  if(book.data.ClassOwner==currentUser.uid)
                  {
                    return <Class data={book} C={"Create"} key={i} />
                  }
                }else if(props.C==="Join"){
                  if(book.data.ClassMemberID==currentUser.uid)
                  {
                    return <Class data={book} C={"Join"} key={i} />
                  }
                }
                 
             })
             }
        </div>
      </div>
    </div>
  );
};

export default ClassList;