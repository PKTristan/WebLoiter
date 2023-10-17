import Founders from "./Founders";
import placeholder from "../../assets/placeholder.png";
import topLeftLogo from "../../assets/top-left-webloiter-homepage.png"
import bottomRight from "../../assets/bottom-right.PNG";


function About() {
    return (
        <section className="about-wrapper">
            <div className="about">
                <div>
                    <img src={topLeftLogo || placeholder} alt="logo" className="logo-img" />
                </div>
                <div>
                    <h2>Welcome to Webloiter</h2>
                    <p>
                        WebLoiter is an online platform for connecting with friends
                        through live servers with text channels for instant messaging needs.
                    </p>
                </div>
                <div>
                    <img src={bottomRight} alt="logo" />
                </div>
            </div>
        </section>
    )
}

export default About;
