
import React from 'react';

/**
 * Contains functionality which may be used universally by Components
 * @extends {React.Component}
 */
export default
class CustomComponent extends React.Component {

    constructor(props) {
        super(props);
        this._bindMethods = this._bindMethods.bind(this);
    }

    /**
     * Binds specified methods to this
     * @param {...Function} methods - The methods to call bind() on
     */
    _bindMethods(...methods: Function) {
        for (const method of methods) {
            this[method.name] = this[method.name].bind(this);
        }
    }

    /**
     * Determines whether any truthy values were passed as props to component
     * @return {Boolean} True if all props were falsy (except false values) else false
     */
    get _noPropsPassed(): Boolean {
        for (const key in this.props) {
            if (!["", undefined, null].includes(this.props[key])) return false;
        }
        return true;
    }

}
