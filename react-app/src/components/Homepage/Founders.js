import userImg from "../../assets/user.png";
import tristan from "../../assets/tristan.jpeg";

function Founders() {

    return (
        <div className="founders-cards">
            <div className="alfonso">
                <img src='https://i.imgur.com/5T32dlj.jpg' alt="alfonso" style={{borderRadius: '50%', height: '500px', width: '400px'}}/>
                <h4>Alfonso</h4>
                <p>
                    Literal founder right here, Top G.
                </p>
            </div>

            <div className="collin">
                <img src={userImg} alt="collin" />
                <h4>Collin</h4>
                <p>
                    Founder slay.
                </p>
            </div>

            <div className="tristan">
                <img src={tristan || userImg} alt="Tristan" />
                <h4>Tristan</h4>
                <p>
                    Queen.
                </p>
            </div>
        </div>
    )
}

export default Founders;
