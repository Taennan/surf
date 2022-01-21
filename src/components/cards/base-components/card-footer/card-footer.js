
import CustomComponent from "components/custom-component";

import Picture from "components/media/picture/picture";

import "./card-footer.scss";

/**
 * [state description]
 * @extends {CustomComponent}

 * @property {Boolean} httpsSecure -
 * @property {Boolean} hasWarnings -
 */
export default
class CardFooter extends CustomComponent {

    render() {
        return (
            <footer className="CardFooter">
                <ul>
                    <li>{(this.props.httpsSecure) ? <Picture.Lock/> : <Picture.Unlock/>}</li>
                    {/*<li>{(this.props.hasWarnings) ? <Picture.ExclaimationMark /> : <Picture.Tick />}</li>*/}
                    {/*<li><Picture.Info /></li>*/}
                </ul>
            </footer>
        )
    }

}
