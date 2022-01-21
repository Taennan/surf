
import "./page-header.scss";

import CustomComponent from "components/custom-component";
import SearchBar     from "./searchbar/searchbar";
import SearchOptions from "./search-options/search-options";

import Picture from "components/media/picture/picture";

export default
class PageHeader extends CustomComponent {

    /**
     * [classes description]
     * @type {Object}
     * @property {String} absolute -
     * @property {String} sticky -
     */
    static get classes() {
        return {
            absolute: "PageHeader position-absolute",
            sticky:   "PageHeader position-sticky",
        };
    };

    constructor(props) {
        super(props);
        this._bindMethods(this._addMenuCards);

        this.state = {
            className: PageHeader.classes.absolute,
        };
    }

    componentDidMount() {

        // Ensures that the PageHeader shows up when the window is scrolled up
        window.addEventListener("scroll", () => {
            const className = (window.scrollY < 0) ? PageHeader.classes.sticky : PageHeader.classes.absolute;
            this.setState({ className: className });
        });

    }

    /**
     * [_addMenuCards description]
     * @private
     */
    // This needs to be a method as the document cannot be queried on the first render
    _addMenuCards() {
        document.querySelector("Grid").addMenuCards();
    }

    render() {
        return(
            <header className={this.state.className}>
                <div className="flex-div">
                    <SearchBar action={this.props.gridFuncs.surf}/>
                    <Picture.Menu onClick={this.props.gridFuncs.menu}/>
                </div>
                <SearchOptions action={this.props.gridFuncs.surf}/>
            </header>
        );
    }

}
