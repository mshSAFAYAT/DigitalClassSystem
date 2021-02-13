import React,{ useState,useEffect,useContext } from "react";
import { auth,db } from "./../firebase";
// import * as firebase from "firebase";

const AuthContext = React.createContext();

const useAuth = () =>{
    return useContext(AuthContext);

}

const AuthProvider = (props)=>{
    const [currentUser, setCurrentUser] = useState({});
    const signup = (email,password,name,phone,userImg)=>{
        
        return auth.createUserWithEmailAndPassword(email, password).then((cred) =>{
            cred.user.updateProfile({displayName:name})
            db.collection("Users").doc(cred.user.uid).set({
                Name: name,
                Phone: phone,
                Email: email,
                ImgURL:"",
            })
        })
        //  firebase
        //  .auth()
        //  .then((userCreds) =>{
        //     console.log(userCreds.user)
        //  });
        //  //return ;
    };
    const logout =()=>{
        return auth.signOut();
    } ; 

    const updateEmail = (email)=>{
        return currentUser.updateEmail(email).then((cred) =>{
            db.collection("Users").doc(currentUser.uid).update({
                Email: email,
            }).then(() =>{
                console.log("Email Updated")
            })
        });
    };
    const updatePassword = (password)=>{
        return currentUser.updatePassword(password);
    };
const login =(email,password)=>{
    return auth.signInWithEmailAndPassword(email,password);
} ;   
    useEffect(()=>{
        const unsubscribe =auth.onAuthStateChanged((user)=>{
            setCurrentUser(user);
        });
        return unsubscribe;
    },[]);

    return(
        <AuthContext.Provider value ={{
            currentUser, 
            signup,
            login,
            logout,
            updateEmail,
            updatePassword,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export {AuthProvider,useAuth};

