import { BACKEND_URLS, SERVER_URL } from './constants.js';

export default class Url {
  constructor({ serverUrl, route, queries, searchSettings }) {
    this.route = route;
    this.searchSettings = searchSettings;
    this.queries = queries;

    this.serverUrl = serverUrl || SERVER_URL;
  }

  #formattedUrlQueriesFromPatternsArray(patternsArray, symbol = '&') {
    return patternsArray.join(symbol);
  }

  #formattedUrlQueriesFromQueriesObject(queries, symbol = '&') {
    return this.#formattedUrlQueriesFromPatternsArray(
      Object.entries(queries).map(([key, value]) => {
        return `${key}=${value}`;
      }),
      symbol,
    );
  }

  get formattedUrlWithQuery() {
    return this.getDefaultUrl(`${this.route}?${this.#formattedUrlQueriesFromQueriesObject(this.queries)}`);
  }

  getDefaultUrl(route) {
    return this.serverUrl + route;
  }

  get defaultUrl() {
    return this.serverUrl + this.route;
  }

  get searchUrl() {
    const { searchPattern, value } = this.searchSettings;
    return this.getDefaultUrl(`${BACKEND_URLS.SEARCH_USER}?${searchPattern}=${value}`);
  }

  #setQueries(queries) {
    this.queries = queries;
  }

  #setRoute(route) {
    this.route = route;
  }
}
