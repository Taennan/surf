
import "./web-card-page-sublinks.scss";

import CustomComponent from "components/custom-component";
import CardTitle from "components/cards/base-components/card-title/card-title";

export default
class WebCardPageSublinks extends CustomComponent {

    constructor(props) {
        super(props);
        this._bindMethods(this._loadSublinks);
    }

    _loadSublinks() {

        if (!this.props.links) return null

        return this.props.links.map( ({ href, text }) => {
            return (
                <li className="WebCardSublinksItem">
                    <a href={href}>
                        <CardTitle.PageSublink text={text}/>
                    </a>
                </li>
            );
        })
    }

    render() {

        return (
            <ul className="WebCardPageSublinks">
                {this._loadSublinks()}
            </ul>
        )
    }

}
