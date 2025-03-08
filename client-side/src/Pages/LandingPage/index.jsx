import { Component } from "react";
import './index.css';

import LandingPageVideo1 from '../../assets/LandingPageBackgroundVideo1.mp4';
import LandingPageVideo2 from '../../assets/LandingPageBackgroundVideo2.mp4';
import LandingPageVideo3 from '../../assets/LandingPageBackgroundVideo3.mp4';
import LandingPageVideo4 from '../../assets/LandingPageBackgroundVideo4.mp4';

import LandingPageNavBar from "../../components/LandingPageNavBar";

class LandingPage extends Component {
    state = {
        currentIndex: 0,
        content: [
            { video: LandingPageVideo1, text: "TOURISM" },
            { video: LandingPageVideo2, text: "NATURE" },
            { video: LandingPageVideo3, text: "BEACHES" },
            { video: LandingPageVideo4, text: "NIGHT LIFE" }
        ],
        isTransitioning: false
    };

    componentDidMount() {
        this.startTransition();
    }
    
    componentWillUnmount() {
        clearTimeout(this.transitionTimeout);
    }
    
    startTransition = () => {
        this.transitionTimeout = setTimeout(() => {
            this.setState({ isTransitioning: true }, () => {
                setTimeout(() => {
                    this.setState(prevState => ({
                        currentIndex: (prevState.currentIndex + 1) % this.state.content.length,
                        isTransitioning: false
                    }), this.startTransition);
                }, 500); // Wait for fade out before changing content
            });
        }, 4500); // Start transition after 4.5 seconds
    };

    render() {
        const { currentIndex, content, isTransitioning } = this.state;
        const currentContent = content[currentIndex];
        const nextIndex = (currentIndex + 1) % content.length;
        const nextContent = content[nextIndex];

        return (
            <div className="landing-main-page">
                <LandingPageNavBar />
                <div className="landing-main-page-video-block">
                    <div className="video-container">
                        <video
                            key={`current-${currentContent.video}`}
                            className="landing-page-video current-video"
                            autoPlay
                            muted
                            playsInline
                        >
                            <source src={currentContent.video} type="video/mp4" />
                        </video>
                        <video
                            key={`next-${nextContent.video}`}
                            className="landing-page-video next-video"
                            autoPlay
                            muted
                            playsInline
                        >
                            <source src={nextContent.video} type="video/mp4" />
                        </video>
                    </div>
                    <div className="landing-main-page-sub-block">
                        <h1 className="h1-edit">Explore Beautiful</h1>
                        <h1 className={`h2-edit ${isTransitioning ? 'fade-out' : ''}`}>
                            {currentContent.text}
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
