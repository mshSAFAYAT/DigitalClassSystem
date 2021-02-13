import React, { useState, useEffect } from "react";
import { Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import ClassList from "./ClassList";


const HeadBar = () => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const handleLogout = async () => {
        setError("");
        try {
            await logout().then(() => {
                history.push("./login");
            });
        } catch (error) {
            setError(error);
        }
    };
    return (
        <div>
        <nav>
            <div className="nav-wrapper blue">
                <Link
                    to='/' style={{ marginLeft: 15 }}>
                    <img src={"https://e7.pngegg.com/pngimages/396/474/png-clipart-teacher-education-school-classroom-computer-icons-teacher-blue-class-thumbnail.png"}
                        alt=""
                        style={{ height: 60 }} />
                </Link>
                <Link
                    to='/' style={{ marginLeft: 750, fontSize: 21 }}>
                    Digital Class System
      </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link to='/' >Home</Link>

                    </li>
                    <li>
                        <Link to='/createClass' >Create Class</Link>

                    </li>
                    <li>
                        <Link to='/joinClass'
                        >Join Class</Link>
                    </li>
                    <li>
                        <Link to='/userProfile' >Profile</Link>
                    </li>
                    <li>
                        <Button onClick={handleLogout} className="btn btn-danger">Log Out</Button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    );
};

export default HeadBar;