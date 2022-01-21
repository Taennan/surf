
import { DisallowedConstructionError } from "errors/code-errors";

/**
 * [web description]
 * @property {String} web   -
 * @property {String} image -
 * @property {String} video -
 */
class SurfCards {

    static get web()    { return "web";   }
    static get image()  { return "image"; }
    /*
     * This will be uncommented when we find a way to
       consistently get video results from the GoogleCSE
    static get video()  { return "video"; }
     */

    static all() {
        return [
            SurfCards.web,
            SurfCards.image,
            //SurfCards.video,
        ];
    }

    constructor() {
        throw new DisallowedConstructionError(this);
    }
}

/**
 * [MenuCards description]
 */
class MenuCards {
    constructor() {
        throw new DisallowedConstructionError(this);
    }
}

/**
 * [web description]
 * @property {Object} Surf -
 * @property {Object} Menu -
 */
export default
class CardType {

    static Surf = SurfCards;
    static Menu = MenuCards;

    constructor() {
        throw new DisallowedConstructionError(this);
    }

}
