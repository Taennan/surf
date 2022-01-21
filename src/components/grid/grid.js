
import './grid.scss';

import CustomComponent from "components/custom-component";
import InfiniteScroll  from "components/infinite-scroll/infinite-scroll";

import Card     from "components/cards/card";
import CardType from "components/cards/card-types";

import Dealer from "structures/dealer";
import SearchOptions from "search-engine/search-options";

import SearchEngine from "search-engine/search-engine";

import { zip } from "structures/iterables";

import { EmptySearchEngineError } from "errors/search-engine-errors";

/*
import ExampleCardOne   from "components/cards/example-cards/one";
import ExampleImageCard from "components/cards/example-cards/image";
 */

/**
 * Displays Cards and automatically adds more if the window is scrolled to the bottom
 * @extends {CustomComponent}
 */
export default
class Grid extends CustomComponent {

    constructor(props) {
        super(props);
        this._bindMethods(
            this._loadContent, this.addSurfCards, this.addMenuCards, this._didScrollToEnd,
            this._renameEntries, this._determineCardTypes, this._stripJson
        );

        this.state = {
            cardData:       [],//[<ExampleCardOne key="example-card-one"/>, <ExampleImageCard key="example-card-two"/>],
            cardDataIndex:  0,
            hasMoreContent: true,
            isShowingMenu:  false,
        };
    }

    /**
     * Does what it says
     * Is not private as it needs to be passed to the searchbar
     * @param {JSON[]} json - The JSON returned from the query chain to use as data for the new cards
     * @param {Boolean} clearPreviousCards - Set to true whenever a new search string is queried
     */
    addSurfCards(json: JSON[], clearPreviousCards: Boolean) {

        let prevCardData,
            cardDataIndex;
        if (clearPreviousCards) {
            prevCardData  = [];
            cardDataIndex = 1;
        } else {
            prevCardData  = this.state.cardData;
            cardDataIndex = this.state.cardDataIndex + 1;
        }

        console.log(`GRID: ${json}`);

        const renamed  = this._renameEntries(json);
        const allCards = prevCardData.concat(renamed);
        const typed    = this._determineCardTypes(allCards);
        const cardData = this._stripJson(typed);

        this.setState({
            cardData,
            cardDataIndex,
            isShowingMenu: false,
        });

    }

    /**
     * Called from the PageHeader to show the settings for the App
     */
    addMenuCards() {

        const cardData = [
            /* TODO: Fill this out with MenuCards */
        ];

        SearchEngine.currentQuery = null;
        this.setState({
            cardData,
            cardDataIndex: 0,
            isShowingMenu: true,
        });
    }

    /**
     * Adds more cards when the window has been scrolled to the bottom
     * @private
     */
    async _didScrollToEnd() {

        // Will fetch extra pages if there is a current query for the SearchEngine
        if (!SearchEngine.currentQuery) return;

        const query = SearchEngine.currentQuery;
        const page  = this.state.cardDataIndex;//Math.floor(this.state.cardData.length / 10) + 1;

        console.log(`Getting page: ${page} for query ${query}`);

        try {

            const results = await SearchEngine.search(query, page);
            this.addSurfCards(results, false);

        } catch (err) {

            // Sets state appropriately if there are no more results to be shown
            if (typeof err === EmptySearchEngineError) this.setState({ hasMoreContent: false })

            // We do not need to catch the potential RangeError from the SearchEngine.search()
            // static method as this method would have already returned if that were possible
            else throw err;

        }

    }

    /**
     * Renames the 'link' entry in every item to 'href'
     * @private

     * @param  {JSON[]} json -
     * @return {JSON[]}      [description]
     */
    _renameEntries(json: JSON[]): JSON[] {

        for (const item of json) {
            item.href = item.link;
            delete item.link;
        }
        return json;
    }

    /**
     * [_determineCardType description]
     * @private

     * @param  {JSON[]} json -
     * @return {JSON[]}
     */
    _determineCardTypes(json: JSON[]): JSON[] {

        if (SearchOptions.searchFilter !== SearchOptions.Filters.hybrid) {
            for (const item of json) {
                item.cardType = SearchOptions.searchFilter;
            }
            return json

        } else {

            const types  = Object.keys(SearchOptions.filterRatio);
            const ratios = Object.values(SearchOptions.filterRatio);

            const dealt = Dealer.deal(json, ratios);

            for (const [arr, type] of zip(dealt, types)) {
                for (const item of arr) {
                    item.cardType = type;
                }
            }

            const undealt = Dealer.undeal(dealt, ratios);
            return undealt;
        }

    }

    /**
     * Gets rid of any useless JSON returned from the Surf Engine
     * @private

     * @param  {JSON[]} json -
     * @return {JSON[]}
     */
    _stripJson(json: JSON[]): JSON[] {

        return json.map( item => {

            switch (item.cardType) {
                case CardType.Surf.web:   return stripToWeb(item);
                case CardType.Surf.image: return stripToImage(item);
                case CardType.Surf.video: return stripToVideo(item);

                default:
                    console.error(`Could not determine the card type of JSON. Will assume it is a Web card`)
                    return stripToWeb(json);
            }

        });

        function stripToBasics(item: JSON): JSON {
            return {
                cardType:    item.cardType,
                href:        item.href,
                title:       item.title,
                snippet:     item.snippet,
                htmlSnippet: item.htmlSnippet,
            };
        }

        /**
         // TODO: Must assign missing properties from the JSON items
         */
        function stripToWeb(item: JSON): JSON {
            return Object.assign({
                pageSublinks: [],
                domainSublinks: [],
            }, stripToBasics(item));
        }
        function stripToImage(item: JSON): JSON {
            return Object.assign({
                src: null
            }, stripToBasics(item));
        }
        function stripToVideo(item: JSON): JSON {
            return Object.assign({
                thumbnail: null
            }, stripToBasics(item));
        }

    }

    /**
     * [_loadContent description]
     * @private
     * @return {JSX}     [description]
     */
    _loadContent(): JSX {

        if (this.state.isShowingMenu) {
            throw new Error("Unimplemented");
        } else {
            return this.state.cardData.map( (json, i) => <Card key={i} {...json}/> );
        }

    }

    render() {
        return (
            <main className="Grid">
                <InfiniteScroll
                    action ={this._didScrollToEnd}
                    content={this._loadContent()}
                    hasMore={this.state.hasMoreContent}/>
            </main>
        )
    }

}
