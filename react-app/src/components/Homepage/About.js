import Founders from "./Founders";
import placeholder from "../../assets/placeholder.png";


function About() {
    return (
        <section className="about-founders-wrapper">
            <img src={placeholder} alt="logo" className="logo-img"></img>
            <div className="about">
                <h1>Welcome to Webloiter</h1>
                <p>
                    WebLoiter is an online platform for connecting with friends
                    through live servers with text channels for instant messaging needs.
                </p>
            </div>
            <Founders />
        </section>
    )
}

export default About;
