"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProvider = void 0;
const searchRequest_1 = require("./searchRequest");
/***
 * Simple helper class which holds the search request for a document
 */
class SearchProvider {
    constructor(document) {
        this._document = document;
    }
    /***
     * @description Creates a new search request and returns the request object
     * @
     */
    createNewRequest() {
        this._request = new searchRequest_1.SearchRequest(this._document);
        return this._request;
    }
    /**
     * @description Cancels the search request and stops tracking in the provider
     */
    cancelRequest() {
        // If it's undefined there's no request to cancel
        if (this._request === undefined)
            return;
        this._request.cancelSearch();
        this._request = undefined;
    }
}
exports.SearchProvider = SearchProvider;
//# sourceMappingURL=searchProvider.js.map