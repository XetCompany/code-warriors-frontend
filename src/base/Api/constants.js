export const BACKEND_URLS = {
    RESET_PASSWORD: 'auth/reset_password/reset/',
    REQUEST_PASSWORD_RESET: 'auth/reset_password/request/',
    LOGIN: 'auth/login/token/',
    REFRESH_TOKEN: 'auth/login/token/refresh/',
    REGISTRATION: 'auth/register/',
    RESPONSE_FOR_REQUEST: 'info/request/response/',
    CATEGORIES: 'info/categories/',
    INFO: 'info/',
    REQUESTS: 'info/requests/',
    REQUESTS_UPDATE: 'info/request/update/',
    REQUESTS_CREATE: 'info/request/create/',
    SEARCH_PERFORMERS: 'info/user_by_categories/',
    USER_INFO: 'info/user/',
    USER_DETAILS: 'info/user/',
    USER_COMMENTS: 'info/reviews/list/',
    PHOTO: 'info/image/',
    RATING: 'info/rating/',
    REVIEW_CREATE: 'info/reviews/create/',
    VIDEO: 'info/video/',
    NOTIFICATIONS: 'info/notifications/',
    NOTIFICATIONS_READ_ALL: 'info/notifications/read_all/',
};
Object.freeze(BACKEND_URLS);

export const SERVER_URL = 'http://6.tcp.eu.ngrok.io:13444/api/';

export const BACKEND_SEARCH_PATTERNS = {
    PRICE: 'price', CATEGORY: 'category', SUBCATEGORY: 'subcategory',
};
Object.freeze(BACKEND_SEARCH_PATTERNS);

