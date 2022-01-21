
import CustomComponent from "components/custom-component";

import CardType from "./card-types";

import WebCard from "./surf-cards/web-card/web-card";
import ImageCard from "./surf-cards/image-card/image-card";
//import VideoCard from "./surf-cards/video-card/video-card";

/**
 * [cardType description]
 * @extends {CustomComponent}

 * @property {CardType.Surf} cardType -
 */
export default
class Card extends CustomComponent {

    static Web(props)   { return <Card cardType={CardType.Surf.web}   {...props}/>; }
    static Image(props) { return <Card cardType={CardType.Surf.image} {...props}/>; }
    // static Video(props) { return <Card cardType={CardType.Surf.video}/>; }

    render() {

        const theRestOfTheProps = Object.fromEntries(Object.entries(this.props).filter( ([key, _]) => key !== "cardType"));

        switch (this.props.cardType) {
            // Surf Cards
            case CardType.Surf.web:   return <WebCard   {...theRestOfTheProps}/>;
            case CardType.Surf.image: return <ImageCard {...theRestOfTheProps}/>;
            // case CardType.Surf.video: return <VideoCard />;

            // Menu Cards
            /* Fill these out later */

            // Throws if invalid card type passed
            default:
                throw new RangeError(`Expected one of ${Object.keys(CardType.Surf).concat(Object.keys(CardType.Menu))} for 'cardType' property of Card, got ${this.props.type}`);
        }
    }

}
