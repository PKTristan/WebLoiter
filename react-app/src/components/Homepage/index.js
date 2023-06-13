import React from "react";
import About from "./About";
import HowTo from "./HowTo";
import "./HomePage.css";

function Homepage() {
    return (
        <div className="homepage-wrapper">
            <About />
            <HowTo />
        </div>
    )
}


export default Homepage;
