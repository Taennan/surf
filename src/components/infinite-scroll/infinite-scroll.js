
//import React from "react";

import './infinite-scroll.scss';

import CustomComponent from "components/custom-component";

import Debounce from "structures/debounce";
import Dealer from "structures/dealer";

import { enumerate } from "structures/iterables";

/**
 * Allows for functionality to be run on detection of the window being scrolled to the bottom
 * This object is meant to be subclassed
 * @extends {CustomComponent}

 * @property {React.Component[]} content -
 * @property {Function} action -
 * @property {Boolean} hasMore -

 * @property {Boolean? | JSX? | String?} startMessage -
 * @property {Boolean? | JSX? | String?} loader -
 * @property {Boolean? | JSX? | String?} endMessage -
 */
export default
class InfiniteScroll extends CustomComponent {

    static get MIN_LOAD_TIME(): Number {
        return 0.5;
    }

    static StartMessage(): JSX {
        return <h3>What would you like to search?</h3>;
    }
    static Loader(): JSX {
        return <h3>Loading...</h3>;
    }
    static EndMessage(): JSX {
        const sarcasticMessages = [
            "No more search results to show",
            "You've sucked the net dry!",
            "Yawn... can't be bothered serving results anymore",
            "No more search results! Head to the library!",
        ];
        const randNum = Number.random(0, sarcasticMessages.length);//Math.floor(Math.random() * sarcasticMessages.length);
        return <h3>{sarcasticMessages[randNum]}</h3>;
    }

    constructor(props) {
        if (typeof props.action !== "function")  throw new TypeError(`Expected a function for the 'action' property in the InfiniteScroll component, got ${props.action}`);
        if (props.content.constructor !== Array) throw new TypeError(`Expected array of components to be passed as value for 'content' property in InfiniteScroll component, got ${props.content}`);

        super(props);
        this._bindMethods(this.runAction, this._loadContent, this._loadFooter);

        window.addEventListener("scroll", Debounce.spread(this.runAction, InfiniteScroll.MIN_LOAD_TIME));
        window.addEventListener("resize", Debounce.spread(this.runAction, InfiniteScroll.MIN_LOAD_TIME));
    }

    get parent() {
        return this.props.parent || document.documentElement;
    }

    get comesShort() {

        const self = document.querySelector(".InfiniteScroll");

        const scrollBottom = this.parent.clientHeight + this.parent.scrollTop;
        const actionBounds = self.offsetTop + self.scrollHeight * 0.9;

        if (scrollBottom >= actionBounds) return true;
        else                              return false;

    }

    componentDidMount() {
        this.runAction();
    }

    componentDidUpdate() {
        this.runAction();
    }

    runAction() {
        if (this.comesShort) this.props.action();
    }

    /**
     * [_loadContent description]
     * @private
     * @returns {JSX}
     */
    _loadContent() {
        const columns = new Array(this.props.columns || 2).fill(1);
        const dealtContent = Dealer.deal(this.props.content, columns);

        let uls = [];
        for (const [arr, i] of enumerate(dealtContent)) {

            let lis = [];
            for (const [item, i] of enumerate(arr)) {
                lis.push(<li key={`row-${i}`}>{item}</li>);
            }
            uls.push(<ul key={`column-${i}`}>{lis}</ul>);

        }

        return <main>{uls}</main>;
    }

    /**
     * [_loadFooter description]
     * @private
     * @returns {JSX?} [description]
     */
    _loadFooter(): JSX | null {

        if (this.props.content.length === 0 && isPositive(this.props.startMessage)) {
            return <footer>{this.props.startMessage || <InfiniteScroll.StartMessage/>}</footer>;

        } else if (this.props.hasMore && isPositive(this.props.loader)) {
            return <footer>{this.props.loader || <InfiniteScroll.Loader/>}</footer>;

        } else if (!this.props.hasMore && isPositive(this.props.endMessage)) {
            return <footer>{this.props.endMessage || <InfiniteScroll.EndMessage/>}</footer>;

        } else {
            return null;
        }

        function isPositive(prop) {
            return ![false, null].includes(prop);
        }

    }

    render() {
        return (
            <div className="InfiniteScroll">
                {this._loadContent()}
                {this._loadFooter()}
            </div>
        );
    }

}
