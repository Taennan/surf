
import CustomComponent from "components/custom-component";
import ResourceIndex from "resources/resource-index.json";

import { ReactComponent as Menu     } from "resources/images/menu.svg";
import { ReactComponent as Lock     } from "resources/images/lock/lock-0.svg";
import { ReactComponent as Unlock   } from "resources/images/unlock/unlock-0.svg";
import { ReactComponent as MagGlass } from "resources/images/mag-glass.svg";
import { ReactComponent as Star     } from "resources/images/star.svg";

import "./picture.scss";

/**
 * [name description]
 * @extends {CustomComponent}

 * @property {Object[]?} imgSet -
 * @property {String}    src    -
 * @property {String}    alt    -
 */
export default
class Picture extends CustomComponent {

    // Local SVG's
    static Lock(props)     { return <Lock     {...props}/>; }
    static Unlock(props)   { return <Unlock   {...props}/>; }
    static Star(props)     { return <Star     {...props}/>; }
    static Menu(props)     { return <Menu     {...props}/>; }
    static MagGlass(props) { return <MagGlass {...props}/>; }
    /* Still have to do these */
    // static ExclaimationMark() { return Picture._GetLocalImage("exclaimationMark", 0); }
    // static Tick()             { return Picture._GetLocalImage("tick", 0); }

    /**
     * [_GetLocalImage description]
     * @private

     * @param  {[type]} name       - [description]
     * @param  {[type]} fromIndex  - [description]

     * @return {Picture}
     */
    static _GetLocalImage(name: String, fromIndex: Number=0): Picture {
        const imgSet = ResourceIndex.images[name];
        return <Picture imgSet={imgSet.sources.slice(fromIndex)}
                        src={imgSet.fallback.src}
                        alt={imgSet.fallback.alt}/>;
    }

    constructor(props) {
        super(props);
        this._bindMethods(this._loadImageSet);
    }

    _loadImageSet(): JSX {
        if (!this.props.imgSet) return null

        return this.props.imgSet.map(({ srcset, media }, i) => {
            return <source srcSet={srcset} media={media} key={`Image ${i}`}/>
        });
    }


    render() {

        if (this._noPropsPassed) return null;

        return (
            <picture className="Picture" onClick={this.props.onClick}>
                {this._loadImageSet()}
                <img src={this.props.src || ""} alt={this.props.alt || ""} />
            </picture>
        );

    }

}
