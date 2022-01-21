
import { createRef } from "react";

import CustomComponent from "components/custom-component";

import './App.scss';

import PageHeader from "components/page-header/page-header";
import Grid from "components/grid/grid";

/**
 * Contains the entire app functionality
 * @extends {CustomComponent}
 */
export default
class App extends CustomComponent {

    constructor(props) {
        super(props);
        this._bindMethods(this._addMenuCards, this._addSurfCards);
        this.gridRef = createRef();
    }

    /**
     * [_addMenuCards description]
     * @private
     */
    _addMenuCards() {
        this.gridRef.current.addMenuCards();
    }

    /**
     * [_addSurfCards description]
     * @private
     */
    _addSurfCards(json: JSON[], clearPreviousCards: Boolean) {
        this.gridRef.current.addSurfCards(json, clearPreviousCards);
    }

    render() {
        return (
            <div className="App">
                <PageHeader gridFuncs={{
                    surf: this._addSurfCards,
                    menu: this._addMenuCards
                }}/>
                <Grid ref={this.gridRef}/>
            </div>
        );
    }

}
