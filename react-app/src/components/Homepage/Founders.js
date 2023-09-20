import userImg from "../../assets/user.png";
import tristan from "../../assets/tristan.jpeg";
import collin from '../../assets/collin.jpg'

function Founders() {

    return (
        <div className="founders-cards">
            <div className="alfonso">
                <a href="https://www.linkedin.com/in/alfonsogswe">
                    <img src='https://i.imgur.com/5T32dlj.jpg' alt="alfonso" />
                </a>
                <h4>Alfonso</h4>
                <p>
                    Literal founder right here, Top G.
                </p>
            </div>

            <div className="collin">
                <a href="https://www.linkedin.com/in/collin-smith-a18b80237/">
                    <img src={collin} alt="collin" />
                </a>
                <h4>Collin</h4>
                <p>
                    Founder slay.
                </p>
            </div>

            <div className="tristan">
                <a href="https://github.com/PKTristan">
                    <img src={tristan || userImg} alt="Tristan" />
                </a>
                <h4>Tristan</h4>
                <p>
                    Queen.
                </p>
            </div>
        </div>
    )
}

export default Founders;
