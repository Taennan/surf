
import GoogleSearchEngine from "./sub-engines/google-search-engine";
import LocalSearchEngine  from "./sub-engines/local-search-engine";

import { enumerate } from "structures/iterables";

import { EmptySearchEngineError, SearchLimitError } from "errors/search-engine-errors";

export default
class SearchEngine {

    /**
     * [engines description]
     * @private
     * @static
     * @returns {Boolean}
     */
    static get _IN_TEST_MODE(): Boolean {
        const engines = process.env.REACT_APP_ENGINES;
        return engines === "local" || !Boolean(engines);
    }

    static currentQuery: String = null;

    /**
     * [description]
     * @private
     * @type {GoogleSearchEngine[]}
     */
    static _engines = (function() {
        if (SearchEngine._IN_TEST_MODE) {
            console.log("TEST MODE");
            // Only needs one local engine
            return [ new LocalSearchEngine() ];
        } else {
            console.log("DIST MODE");
            /*
             * The env arg will have to be written like so:
               REACT_APP_ENGINES='engine-one-id engine-one-key, engine-two-id engine-two-key,...'

             * DO NOT put a comma at the end of the string

             * Or just copy paste this into a .env file
               '12c6c996008d34971 AIzaSyAa-jNKciyyuU9LxxkEkHcLlzJca5alAR0'
             */

            const engineSplitter = ",";
            const keySplitter    = " ";

            const arr = process.env.REACT_APP_ENGINES.split(engineSplitter);
            let engines = [];
            for (const item of arr) {
                const [id, apiKey] = item.split(keySplitter);
                engines.push(new GoogleSearchEngine(id, apiKey));
            }

            return engines;
        }
    })()

    /**
     * [search description]
     * @param  {String} searchString - A non empty string to query
     * @param  {Number} page -
     *
     * @throws {RangeError} - Thrown if a non empty string is passed as the 'searchString' param
     * @throws {EmptySearchEngineError} - Thrown if there are no more results to be returned by the sub-engines

     * @return {Promise<JSON[]>} - A list of JSON objects with the GoogleCSE data
     */
    static async search(searchString: String, page: Number): Promise<JSON[]> {
        // Sanity check
        if (!searchString) throw new RangeError(`Expected a non-empty String for 'searchString' param in SearchEngine.search(), got ${searchString}`);

        SearchEngine.currentQuery = searchString;

        const allEngines = SearchEngine._engines;

        let results = [];
        for (const [engine, i] of enumerate(allEngines)) {
            // Stops querying sub-engines if a minimum limit has been reached
            if (results.length >= 10) break;

            try {

                // Appends results of sub-engine to the array to return
                const json = await engine.search(searchString, page);
                results = results.concat(json.items);

            } catch (err) {

                // If all the sub engines are out of queries, throws an error
                if (err instanceof SearchLimitError) {
                    if (i + 1 === allEngines.length) throw new EmptySearchEngineError(searchString);
                    else                             continue;

                } else {
                    throw err;
                }

            }
        }

        console.log(`SE: ${results}`);
        return results;
    }


}
