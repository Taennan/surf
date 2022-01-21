
import { SearchLimitError } from "errors/search-engine-errors";

/**
 * Connects to a single Google Custom Search Engine to request their JSON API
 */
export default
class GoogleSearchEngine {

    /**
     * @param {String} id     - The ID for the GoogleCSE to be linked to
     * @param {String} apiKey - The API Key for the GoogleCSE to be linked to
     */
    constructor(id: String, apiKey: String) {
        this.id = id;
        this.apiKey = apiKey;
    }

    /**
     * Requests and returns the GoogleCSE JSON API results for the secified search string

     * @param {String} query - The string to be searched by the GoogleCSE
     * @param {Number} start - The start index of results to be returned

     * @throws {RangeError | SearchLimitError}
     * @return {JSON}
     */
    async search(query: String, page: Number): Promise<JSON> {

        if (page < 0 || page > 9) throw new RangeError(`Expected a Number value between 0...9 for 'page' arg in LocalSearchEngine's search() method, got ${page}`);

        const url = `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.id}&q=${query}&start=${page}`;
        const response = await fetch(url);
        const json     = await response.json();

        console.log(`Google: ${json}`);

        if (json.error) {
            switch (json.error.code) {
                case 429: throw new SearchLimitError(this.id, this.apiKey);

                default:
                    throw new Error(`Unkown Error with code: ${json.error.code} occurred when retreiving search results from LocalSearchEngine. Full error message: ${json.error.message}`);
            }
        }

        return json;
    }

}
