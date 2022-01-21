
import "./search-options.scss";

import CustomComponent from "components/custom-component";
import GlobalSearchOptions from "search-engine/search-options";
import SearchEngine from "search-engine/search-engine";

import { enumerate } from "structures/iterables";

/**
 * [state description]
 * @extends {CustomComponent}
 */
export default
class SearchOptions extends CustomComponent {

    constructor(props) {
        super(props);
        this._bindMethods(this._setButtons);

        this.state = {
            buttons: [],
        };
    }

    // Determines the active button on startup
    componentDidMount() {
        this._setButtons(0);
    }

    /**
     * [_setButtons description]
     * @private
     * @param {Number} activeButton - [description]
     */
    _setButtons(activeButton: Number) {

        let buttons = [];
        let filters = Object.keys(GlobalSearchOptions.Filters);

        // Needed to put this sanity check here as getting the length of the
        //  this.state.buttons would return zero on the first render
        if (activeButton < 0 || activeButton > filters.length - 1) throw new RangeError(`Expected argument within range of 0...${filters.length - 1}, got: ${activeButton}`);

        for (const [filter, i] of enumerate(filters)) {

            //
            const textContent = `${filter[0].toUpperCase()}${filter.slice(1)}`;
            const className = (i === activeButton) ? "active-button" : null;

            // Need a reference to this inside the function
            const self = this;
            const setOptions = async function() {

                // Resets the global variable to match the search opton selected
                GlobalSearchOptions.searchFilter = filter;
                //
                self._setButtons(i);

                // Re-queries the SearchEngine so that the cards are re-rendered
                //  as image or web cards depending on the search option clicked
                const results = await SearchEngine.search(SearchEngine.currentQuery, 0);
                self.props.action(results, true);

            };

            buttons.push(
                <li key={filter}
                    className={className}
                    onClick={setOptions}>
                        {textContent}
                </li>
            );
        }

        this.setState({ buttons: buttons });
    }

    render() {
        return <ul className="SearchOptions">{this.state.buttons}</ul>;
    }

}
