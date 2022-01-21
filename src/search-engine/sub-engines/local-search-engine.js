
import { SearchLimitError } from "errors/search-engine-errors";

/**
 * Used for testing purposes
 */
export default
class LocalSearchEngine {

    /**
     * Returns GoogleCSE results cached in local filesystem
     * @param  {String}  query - The search string. This is only used if the
                                 'options' arg has it's 'new' property set to true
     * @param  {Number}  page - The file number of results to return. Allowed values
                                are from 0...9 inclusive. This arg is not actually used,
                                but is kept to keep a consistent interfacewith the SearchEngine() class
     * @param  {Object}  options - An Object with properties used to determine
                                   the result of the method. Set the 'new' property
                                   to true to query a specific search string or the
                                   'next' property to true to return the next set of cached results

     * @throws {SearchLimitError} - Thrown if there are no results left for specified query in local filesystem
     * @return {Promise<JSON>}
     */
    async search(query: String, page: Number): JSON {

        // Sanity check. Also serves to silence unused var error
        if (page < 0 || page > 9) throw new RangeError(`Expected a Number value between 0...9 for 'page' arg in LocalSearchEngine's search() method, got ${page}`);

        // Constructs path
        // - The host and port are automatically added via the "proxy" setting in package.json
        const path = (page === 0) ? `new/${query}` : "next";

        // Gets results from local server
        const response = await fetch(`http://localhost:8000/${path}`);
        // The results have to be converted into strings and then JSON as the local server returns text
        const text = await response.text();
        const json = await JSON.parse(text);

        // Checks for errors
        if (json.error) {
            switch (json.error.code) {
                case 429: throw new SearchLimitError(this.id, this.apiKey);
                default:  throw new Error(`Unkown Error with code: ${json.error.code} occurred when retreiving search results from LocalSearchEngine. Full error message: ${json.error.message}`);
            }
        }

        return json;
    }

}
