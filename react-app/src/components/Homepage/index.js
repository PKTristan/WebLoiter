import React from "react";
import About from "./About";
import HowTo from "./HowTo";
import "./HomePage.css";
import Founders from "./Founders";

function Homepage() {
    return (
        <div className="homepage-wrapper">
            <div className="homepage-content">
                <About />
            </div>
            <div className="homepage-content">
                <HowTo />
            </div>
            <div className="homepage-content">
                <Founders />
            </div>
        </div>
    )
}


export default Homepage;
