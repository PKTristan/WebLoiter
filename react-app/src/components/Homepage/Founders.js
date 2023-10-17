import userImg from "../../assets/user.png";
import tristan from "../../assets/tristan.jpeg";
import collin from '../../assets/collin.jpg'

function Founders() {

    return (
        <div className="founders-cards">
            <div className="alfonso">
                <img src='https://i.imgur.com/1VJ5DUn.jpg' alt="alfonso" />
                <h4>Alfonso Gabriel</h4>
                <p>
                    Recent App Academy graduate, looking forward to learning 
                    and growing in the industry.
                </p>
                <ul>
                    <li>
                        <a href="https://github.com/agabriele73">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/alfonsogswe">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="collin">
                <img src={collin} alt="collin" />
                <h4>Collin Smith</h4>
                <p>
                    Full Stack Web Developer, and collaborator to this project.
                </p>
                <ul>
                    <li>
                        <a href="https://github.com/collin-smith23">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/collin-smith-a18b80237/">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tristan">
                <img src={tristan || userImg} alt="Tristan" />
                <h4>Tristan Calderon</h4>
                <p>
                    Queen. Engineer. Developer.
                </p>
                <ul>
                    <li>
                        <a href="https://github.com/PKTristan">
                            <i className="fab fa-github"></i>
                        </a>
                    </li><li>
                        <a href="https://www.linkedin.com/in/tristan-calderon-276774115/">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Founders;
