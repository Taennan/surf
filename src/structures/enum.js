
import CreateGetter from "./create-getter";

export default
class Enum {

    constructor(values: any[], options: Object={}) {
        CreateGetter(this, "_values", values);

        this.options = Object.assign({
            frozen: true,
            iterable: true,
            firstLetterValues: false,
        }, options);

        for (const v of values) {
            this[v] = v;
        }

        if (this.options.frozen) Object.freeze(this);
    }

    includes(x: String): Boolean {
        for (const v of this._values) {
            if (v === x) return true;
        }
        return false;
    }

    allItems(): String[] {
        if (!this.options.iterable) throw new Error("Called 'allItems()' on Enum which has it's 'iterable' option set to false");
        return this._values
    }

}
