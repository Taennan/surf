
import CustomError from "./custom-error";

export
class EmptySearchEngineError extends CustomError {

    constructor(query: String) {
        super(`No more search results for query ${query}`);
    }

}

export
class SearchLimitError extends CustomError {

    constructor(engineID: String, apiKey: String) {
        super(`Maximum search limit reached for engine: ${engineID} and api key: ${apiKey}`);
    }

}
