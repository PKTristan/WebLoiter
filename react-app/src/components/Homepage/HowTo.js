import placeholder from "../../assets/placeholder.png";
import webloiterExample from "../../assets/webloiter-example.png";
import bottomRight from "../../assets/bottom-right.PNG";

function HowTo() {

    return (
        <section className="how-prod-works-wrapper">
            <div className="how-to">
                <h2>How it Works</h2>
                <p>
                    To use our product first login with your account or sign up for a new one.
                    Then go to your server page and select the channel you want to use.
                    Once you have selected the channel, you can start chatting with your friends.
                </p>
            </div>
            <div>
                <img src={webloiterExample} alt="product" className='webloiter-example' />
            </div>
            <div>
                <img src={bottomRight} alt="logo" />
            </div>
        </section>
    )
}

export default HowTo;
