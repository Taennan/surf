
import './searchbar.scss';

import CustomComponent from "components/custom-component";
import Picture from "components/media/picture/picture";
import SurfEngine from "search-engine/search-engine";

/**
 * [event description]
 * @property {Function} action - The function to call when the Enter key is pressed
                               - In this case, it is the Grid's 'addSurfCards()' method
 */
export default
class SearchBar extends CustomComponent {

    constructor(props) {
        super(props);
        this._bindMethods(this._search);
    }

    /**
     * [_search description]
     * @param {Event} event - [description]
     */
    async _search(event: Event) {
        // As this method is called every time a key is released, we'll have to
        // allow it to run it's course only if the keys are Enter or Return
        if (event.code === "Enter" || event.code === "NumpadEnter") {

            // The 'event.target' is the element the event is fired from (I think)
            const searchStr = event.target.value;
            const results = await SurfEngine.search(searchStr, 0);
            this.props.action(results, true);

        }

    }

    render() {
        return (
            <div className="SearchBar">
                <Picture.MagGlass />
                <input type="text"
                       placeholder="Surf with Google"
                       onKeyUp={this._search}/>
            </div>
        );
    }

}
