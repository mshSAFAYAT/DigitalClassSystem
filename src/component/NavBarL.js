import React, { useState, useEffect } from "react";
import { Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "./../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "./../firebase";
import ClassList from "./ClassList";


const HeadBarL = () => {
    const [error, setError] = useState("");
    const [Classes, setClasses] = useState([]);
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
                    <a className="brand-logo" style={{ marginLeft: 15 }}>
                        <img src={"https://e7.pngegg.com/pngimages/396/474/png-clipart-teacher-education-school-classroom-computer-icons-teacher-blue-class-thumbnail.png"}
                            alt=""
                            style={{ height: "65px" }} />
                    </a>
                    <a className="brand-logo" style={{ marginLeft: 800 }}>
                    Digital Class System
          </a>
                </div>
            </nav>
        </div>
    );
};

export default HeadBarL;